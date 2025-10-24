const { Router } = require("express");
const { authentication, validateLeague } = require("../../middlewares");
const LeagueService = require("../../../services/LeagueService");
const AwardsService = require("../../../services/AwardsService");
const { ApiError } = require("../../../errors");
const joiValidation = require("../../middlewares/joiValidation");
const { leaguesBySeasonSchema, leagueKeyPath } = require("../../../utils/schemas");
const { demoV1 } = require("../../../utils/demo");

const route = Router();

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
        } catch(err) {
            return next(err);
        }
    });

    route.get("/leagues/:leagueKey/awards", authentication, joiValidation(leagueKeyPath, "params"), validateLeague, async (req, res, next) => {
        try {
            const { tid, params, provider, userPK } = req;
            const { leagueKey } = params;
            const awards = await AwardsService.retrieveLeagueAwards(tid, provider, leagueKey);
            const league = await LeagueService.getLeagueByLeagueKey(tid, userPK, provider, leagueKey);
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
