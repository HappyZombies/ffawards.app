const { Router } = require("express");
const rateLimit = require('express-rate-limit');

const { authentication, validateLeague } = require("../../middlewares");
const LeagueService = require("../../../services/LeagueService");
const AwardsService = require("../../../services/AwardsService");
const { ApiError } = require("../../../errors");
const joiValidation = require("../../middlewares/joiValidation");
const { leaguesBySeasonSchema, leagueKeyPath, shareIdPath } = require("../../../utils/schemas");
const { demoV1 } = require("../../../utils/demo");

const route = Router();

const shareLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 50, // max 50 requests per IP per minute
    message: "Too many requests, please try again later."
});

module.exports = app => {
    app.use("/dashboard", route);

    route.get("/leagues", authentication, joiValidation(leaguesBySeasonSchema, "query"), async (req, res, next) => {
        const { tid, query, userPK, provider } = req;
        const { season } = query;
        // TODO: We might need to remove the espn provider we handle the retrieval of leagues different for private leagues (by actual logged in user vs the shared user)
        if (provider === "espn") {
            // we have this because we will return all leagues if we don't, only return the leagues that are in the cookie.
            const league = await LeagueService.getLeagueByLeagueKey(tid, userPK, provider, req.cookies.espn_league_id);
            return res.json([league]);
        }
        if (provider === "sleeper") {
            // we have this because we will return all leagues if we don't, only return the leagues that are in the cookie.
            const league = await LeagueService.getLeagueByLeagueKey(tid, userPK, provider, req.cookies.sleeper_league_id);
            return res.json([league]);
        }
        try {
            const leagues = await LeagueService.getUsersLeaguesBySeason(tid, userPK, provider, season);
            return res.json(leagues);
        } catch (err) {
            return next(err);
        }
    });

    route.get("/leagues/:leagueKey/awards", authentication, joiValidation(leagueKeyPath, "params"), validateLeague, async (req, res, next) => {
        try {
            const { tid, params, provider, userPK } = req;
            const { leagueKey } = params;
            const awards = AwardsService.retrieveLeagueAwards(tid, provider, leagueKey);
            const league = LeagueService.getLeagueByLeagueKey(tid, userPK, provider, leagueKey);
            const promiseResult = await Promise.all([awards, league]);
            return res.json({ awards: promiseResult[0], league: promiseResult[1], });
        } catch (err) {
            return next(err);
        }
    });

    route.get("/share/:shareId/awards", shareLimiter, joiValidation(shareIdPath, "params"), async (req, res, next) => {
        try {
            const { tid, params } = req;
            const { shareId } = params;
            const league = await LeagueService.getLeagueByShareId(tid, shareId);
            const awards = await AwardsService.retrieveLeagueAwards(tid, league.provider, league.league_key);
            return res.json({ league, awards });
        } catch (err) {
            return next(err);
        }
    });


    route.post("/leagues/:leagueKey/generate-awards", authentication, joiValidation(leagueKeyPath, "params"), validateLeague, async (req, res, next) => {
        try {
            const { tid, params, provider, userPK } = req;
            const { leagueKey } = params;
            await AwardsService.generateDefaultLeagueAwards(tid, provider, leagueKey, userPK);
            const awards = await AwardsService.retrieveLeagueAwards(tid, provider, leagueKey);
            const league = await LeagueService.getLeagueByLeagueKey(tid, userPK, provider, leagueKey);
            if (!league.share_id) {
                const share_id = await LeagueService.updateLeagueWithShareId(tid, userPK, league.SK);
                league.share_id = share_id;
            }
            return res.json({ league, awards });
        } catch (error) {
            return next(new ApiError(error.message, req.tid, error.message, 500));
        }
    });

    route.get("/leagues/demo", async (req, res, next) => {
        try {
            return res.json(demoV1);
        } catch (error) {
            return next(new ApiError(error.message, req.tid, error.message, 500));
        }
    });

};
