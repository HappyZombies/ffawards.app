const { Router } = require("express");

const { setupLoggerWrapper } = require("../../../services/LoggerService");

const YahooService = require("../../../services/YahooService");
const AuthService = require("../../../services/AuthService");
const { encrypt, THIRTY_DAYS_MAX_AGE } = require("../../../utils");
const { clearAllAuthCookies, CONSTANTS } = require("../../../utils/auth");
const { authentication, joiValidation } = require("../../middlewares");
const { callbackSchema, leaguesBySeasonSchema } = require("../../../utils/schemas");
const { ApiError, INTERNAL_SERVER_ERROR } = require("../../../errors");
const { HttpStatusCode } = require("axios");
const SleeperService = require("../../../services/SleeperService");
const ESPNService = require("../../../services/ESPNService");


const route = Router();

module.exports = app => {

    app.use("/auth", route);

    route.get("/login", async (req, res, next) => {
        const { tid } = req;
        const logger = setupLoggerWrapper(tid, "authenticate", { __filename });
        logger.trace("Authenticating with Yahoo.");
        try {
            YahooService.yf.auth(res, null, "openid");
        } catch (err) {
            logger.error({ err }, "Error authenticating with Yahoo.");
            return next(new ApiError(INTERNAL_SERVER_ERROR, tid, err));
        }
    });

    route.get("/login/sleeper", async (req, res, next) => {
        const { tid } = req;
        const logger = setupLoggerWrapper(tid, "authenticate", { __filename });
        const sleeperLeagueId = req.query.leagueId;
        logger.trace("Authenticating with Sleeper.");
        try {
            const { session, user } = await SleeperService.login(tid, sleeperLeagueId);
            // we have the user from our account, let's set them their session token and cookies for yahoo API.
            const cookieOptions = { httpOnly: true, secure: true, maxAge: THIRTY_DAYS_MAX_AGE };
            res.cookie(CONSTANTS.SESSION_TOKEN, session.session_token, cookieOptions);
            res.cookie(CONSTANTS.SLEEPER_LEAGUE_ID, sleeperLeagueId, cookieOptions);
            return res.json({ user });
        } catch (err) {
            logger.error({ err }, "Error authenticating with Sleeper.");
            return next(new ApiError(INTERNAL_SERVER_ERROR, tid, err));
        }
    });

    route.get("/login/espn", async (req, res, next) => {
        const { tid } = req;
        const logger = setupLoggerWrapper(tid, "authenticate", { __filename });
        const leagueId = req.query.leagueId;
        logger.trace("Authenticating with ESPN.");
        try {
            ESPNService.setCookies(req.cookies?.espn_s2, req.cookies?.SWID);
            const { session, user } = await ESPNService.login(tid, leagueId);
            // we have the user from our account, let's set them their session token and cookies for yahoo API.
            const cookieOptions = { httpOnly: true, secure: true, maxAge: THIRTY_DAYS_MAX_AGE };
            res.cookie(CONSTANTS.SESSION_TOKEN, session.session_token, cookieOptions);
            res.cookie(CONSTANTS.ESPN_LEAGUE_ID, leagueId, cookieOptions);
            return res.json({ user });
        } catch (err) {
            logger.error({ err }, "Error authenticating with ESPN.");
            return next(new ApiError(INTERNAL_SERVER_ERROR, tid, err));
        }
    });

    route.get("/login/sleeper/:username/leagues", joiValidation(leaguesBySeasonSchema, "query"), async (req, res, next) => {
        const { tid } = req;
        const logger = setupLoggerWrapper(tid, "authenticate", { __filename });
        const sleeperUsername = req.params.username;
        const season = req.query.season;
        logger.trace("Authenticating with Yahoo.");
        try {
            const leagues = await SleeperService.getLeaguesByUsernameAndSeason(tid, sleeperUsername, season);
            // return just the basic stuff we need.
            const leagueData = leagues.map(league => {
                return {
                    league_id: league.league_id,
                    name: league.name,
                    season: league.season
                };
            });
            return res.json(leagueData);
        } catch (err) {
            logger.error({ err }, "Error authenticating with Sleeper.");
            return next(new ApiError(INTERNAL_SERVER_ERROR, tid, err));
        }
    });

    route.get("/logout", authentication, async (req, res) => {
        const { tid, cookies, userPK } = req;
        const logger = setupLoggerWrapper(tid, "logout", { __filename });
        const { session_token } = cookies;;
        try {
            await AuthService.logout(tid, userPK, session_token);
        } catch (err) {
            logger.warn({ err }, "Error logging out, will not delete session but just clear cookies.");
        } finally {
            clearAllAuthCookies(res);
        }
        return res.status(HttpStatusCode.NoContent).send("");
    });

    route.get("/yahoo/callback", joiValidation(callbackSchema, "query"), async (req, res, next) => {
        const { tid } = req;
        const logger = setupLoggerWrapper(tid, "authenticate", { __filename });
        logger.trace("Callback method has been called.");
        YahooService.yf.authCallback(req, async (err, yahooAuthData) => {
            if (err || yahooAuthData.error) {
                logger.error({ yahooAuthData }, "There was some sort of error when we hit the callback to Yahoo.");
                return res.status(HttpStatusCode.InternalServerError).json({ err: err || yahooAuthData.error });
            }
            let user, session;
            // TODO: Implement a refresh token request if the access_token is invalid
            // * NOTE: It appears that starting around 7/26/2024, the token that is sent back with authorization_code is bugged and doesn't work.
            // However I can use the refresh_token to send a refresh_token grant type and get a proper access_token...so that's what I will do now.
            // So what I will do, is send a simple API request a basic fantasyapis.com endpoint to see if this token works, if it doesn't. I will send the refresh_token request as a backup.
            // const refreshTokenPromise = util.promisify(YahooService.yf.refreshToken.bind(YahooService.yf));
            // const yahooResult = await refreshTokenPromise();
            try {
                const result = await AuthService.authenticate(tid, yahooAuthData);
                ({ user, session } = result); // Destructure and assign the result
            } catch (err) {
                logger.error({ err }, "Error authenticating the user.");
                return next(new ApiError(err.message, tid));
            }
            // we have the user from our account, let's set them their session token and cookies for yahoo API.
            const cookieOptions = { httpOnly: true, secure: true, maxAge: THIRTY_DAYS_MAX_AGE };
            const { access_token, refresh_token } = yahooAuthData;
            res.cookie("session_token", session.session_token, cookieOptions);
            // NOTE: For now set the expiration for the access token to 30 days -- it's really only valid for one hour but we will refresh it when it expires.
            res.cookie("yahoo_access_token", encrypt(access_token), cookieOptions);
            // NOTE: The refresh token has no expires_in from Yahoo, so just set it to 30 days.
            res.cookie("yahoo_refresh_token", encrypt(refresh_token), cookieOptions);
            return res.json({ user });
        });
    });

    route.delete("/account", authentication, async (req, res, next) => {
        const logger = setupLoggerWrapper(req.tid, "delete_account", { __filename });
        // logger.trace({ trackingId: req.tid }, "Deleting account.");
        // const { tid, userPK } = req;
        // try {
        //     await AuthService.deleteAccount(tid, userPK);
        // } catch (err) {
        //     logger.error({ err }, "Error deleting account.");
        //     return res.status(500).json({ error: "Internal Server Error" });
        // }
        // clearAllAuthCookies(res);
        // return res.status(200).json({ message: "Account deleted successfully." });
        logger.error("Error deleting account, not yet implemented.");
        return next(new ApiError(INTERNAL_SERVER_ERROR, req.tid, "Not yet implemented.", HttpStatusCode.NotImplemented));
    });

};
