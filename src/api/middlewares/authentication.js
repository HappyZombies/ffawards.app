const { promisify } = require("util");

const { ApiError, UNAUTHORIZED_ERROR } = require("../../errors");
const { setupLoggerWrapper } = require("../../services/LoggerService");
const SessionService = require("../../services/SessionService");
const UserService = require("../../services/UserService");
const YahooService = require("../../services/YahooService");
const { decrypt, encrypt, THIRTY_DAYS_MAX_AGE } = require("../../utils");
const { clearAllAuthCookies } = require("../../utils/auth");
const SleeperService = require("../../services/SleeperService");
const ESPNService = require("../../services/ESPNService");

const yahooAuthentication =  async (tid, cookies, session, res, next, logger) => {
    let yahooAccessToken;
    try {
        yahooAccessToken = decrypt(cookies.yahoo_access_token);
    } catch (err) {
        clearAllAuthCookies(res);
        logger.error({ err }, "Failed to decrypt yahoo access token.");
        return next(new ApiError(UNAUTHORIZED_ERROR, tid, "Invalid session token.", 401));
    }

    YahooService.yf.setUserToken(yahooAccessToken);
    if(new Date() >= new Date(session.token_expiry)) {
        logger.warn("token is expired, getting a new one now.");
        let yahooRefreshToken;
        try {
            yahooRefreshToken = decrypt(cookies.yahoo_refresh_token);
        } catch (err) {
            clearAllAuthCookies(res);
            logger.error({ err }, "Failed to decrypt yahoo access token.");
            return next(new ApiError(UNAUTHORIZED_ERROR, tid, "Invalid session token.", 401));
        }
        YahooService.yf.setRefreshToken(yahooRefreshToken);
        const refreshTokenPromise = promisify(YahooService.yf.refreshToken.bind(YahooService.yf));
        const { access_token, expires_in } = await refreshTokenPromise();
        // update the cookie with the new access token
        res.cookie("yahoo_access_token", encrypt(access_token), { httpOnly: true, secure: true, maxAge: THIRTY_DAYS_MAX_AGE });
        await UserService.updateUserAccountByPK(tid, session.PK, expires_in);
        YahooService.yf.setUserToken(access_token);
    }
};

const sleeperAuthentication = async (tid, cookies, session, res, next, logger) => {
    await SleeperService.getLeagueData(tid, cookies.sleeper_league_id);
};

const espnAuthentication = async (tid, cookies, session, res, next, logger) => {
    if(cookies?.espn_s2 && cookies?.SWID) {
        ESPNService.setCookies(cookies.espn_s2, cookies.SWID);
    }
    await ESPNService.getLeagueData(tid, cookies.espn_league_id);
};

const strategies = {
    yahoo: yahooAuthentication,
    sleeper: sleeperAuthentication,
    espn: espnAuthentication
};

const authentication = async (req, res, next) => {
    // NOTE: If we have a different provider, we need to set the correct auth creds to the right place.
    const tid = req.tid;
    const logger = setupLoggerWrapper(tid, "session_auth", { __filename });
    const { session_token } = req.cookies;
    if (!session_token) {
        clearAllAuthCookies(res);
        return next(new ApiError(UNAUTHORIZED_ERROR, tid, "No session token provided.", 401));
    }
    let session;
    try {
        session = await SessionService.getAccountSession(tid, session_token);
    } catch (err) {
        clearAllAuthCookies(res);
        logger.error({ err }, "Failed to query postgres for session.");
        return next(new ApiError(UNAUTHORIZED_ERROR, tid, "Invalid session token.", 401));
    }
    if (!session) {
        clearAllAuthCookies(res);
        return next(new ApiError(UNAUTHORIZED_ERROR, tid, "Invalid session token.", 401));
    }

    const authStrategy = strategies[session.provider];

    try {
        await authStrategy(tid, req.cookies, session, res, next, logger);
    } catch(err) {
        logger.warn("Baddd", { err });
        return next(new ApiError(UNAUTHORIZED_ERROR, tid, "Invalid session token.", 401));
    }
 
    req.session = session;
    req.userPK = session.PK;
    req.provider = session.provider;
    return next();
};

module.exports = authentication;
