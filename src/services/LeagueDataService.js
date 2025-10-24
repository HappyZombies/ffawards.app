const { ApiError, ApplicationError } = require("../errors");
const YahooService = require("./YahooService");
const { mapTeam, mapRoster } = require("yahoo-fantasy").teamHelper;
const { setupLoggerWrapper } = require("./LoggerService");
const SleeperService = require("./SleeperService");
const ESPNService = require("./ESPNService");

class LeagueDataService {

    constructor() {
        this.strategies = {
            yahoo: this._gatherYahooData,
            sleeper: this._gatherSleeperData,
            espn: this._gatherESPNData
            // Add more strategies for different providers
        };
    }

    async _gatherESPNData(tid, leagueId) {
        const { default: pLimit } = await import("p-limit");
        const limit = pLimit(5);

        const leagueDataAndTeamData = await ESPNService.getLeagueAndTeamData(tid, leagueId);

        const currentWeek = leagueDataAndTeamData.status.currentMatchupPeriod;

        const promiseArrayStatsByWeek = [];
        for (let week = 1; week <= currentWeek; week++) {
            // thankfully unlike Sleeper, this data point has the week in the response 
            promiseArrayStatsByWeek.push(limit(() => ESPNService.getMatchupScoreByWeek(tid, leagueId, week)));
        }

        const allStatsByWeek = await Promise.all(promiseArrayStatsByWeek);

        const playerPoints = leagueDataAndTeamData.teams.reduce((acc, player) => {
            const { id, name, points } = player;
            acc[id] = {
                teamName: name,
                total: points
            };
            return acc;
        }, {});

        return {
            leagueDataAndTeamData, // not being used right now, but could be useful in the future
            allStatsByWeek,
            playerPoints
        };
    }

    // TODO: This method is hard to read, clean it up, we need to run all this extra stuff since the Sleeper data we need is scattered across different endpoints.
    async _gatherSleeperData(tid, leagueKey) {
        const { default: pLimit } = await import("p-limit");
        const limit = pLimit(5);

        const promises = [
            SleeperService.fetchNFLState(tid),
            SleeperService.fetchRosters(tid, leagueKey),
            SleeperService.getUsersInLeague(tid, leagueKey),
            SleeperService.fetchLeagueInfo(tid, leagueKey)
        ];
        const [nflState, rosters, users, leagueSettings] = await Promise.all(promises);
        // convert users to a new Map()
        const usersMap = new Map();
        users.forEach(user => {
            user.metadata.team_name = user.metadata.team_name || `Team ${user.display_name}`;
            usersMap.set(user.user_id, user);
        });

        const result = {
            matchups: [],
            rosters,
            users: usersMap,
            leagueSettings,
            statsByWeek: new Map()
        };
        const promiseArrayMatchups = [];
        const promiseArrayStats = [];
        let currentWeek = nflState.week;
        if (nflState.season !== leagueSettings.season) {
            // the season is NOT the current season, so it's over, set to 17 or whateveer.
            currentWeek = 18;
        }
        for (let week = 1; week <= currentWeek; week++) {
           promiseArrayMatchups.push(limit(() => SleeperService.fetchMatchups(tid, leagueKey, week)));
           promiseArrayStats.push(limit(() => SleeperService.fetchPlayerStats(tid, week)));
        }
        const allStats = await Promise.all(promiseArrayStats);
        // i don't like this, we need the matchups to include the weeks somehow
        let allMatchupsByWeeks = await Promise.all(promiseArrayMatchups);
        for (let i = 0; i < allMatchupsByWeeks.length; i++) {
            const week = i + 1;
            // set the stats map
            const stats = allStats[i];
            const allPlayerStats = new Map();
            for (const [key, value] of Object.entries(stats)) {
                allPlayerStats.set(key, value);
            }
            result.statsByWeek.set(week, allPlayerStats);
            // now do matchups
            let matchups = allMatchupsByWeeks[i];
            matchups = matchups.map(m => {
                m.week = i + 1;
                return m;
            });
            result.matchups.push(...matchups);
        }
        return result;
    }

    async _gatherYahooData(tid, leagueKey) {
        const logger = setupLoggerWrapper(tid, "_gatherData", { __filename });
        logger.debug({ leagueKey }, "Gathering data for the league.");

        const { default: pLimit } = await import("p-limit");
        const limit = pLimit(5);
        
        logger.trace("Fetching teams from Yahoo service.");
        const teams = await YahooService.yf.league.teams(leagueKey);
        logger.info("Fetching teams from Yahoo service.", { leagueKey, scoring_type: teams.scoring_type  });
        if (teams.draft_status === "predraft") {
            logger.error({ leagueKey }, "League has not drafted yet.");
            throw new ApiError("This league has not drafted yet.");
        }
        // if (teams.scoring_type !== "head") {
        //     logger.error({ leagueKey, scoring_type: teams.scoring_type }, "League is not head-to-head.");
        //     throw new ApiError("A league can only be head-to-head.");
        // }

        const teamKeys = teams.teams.map(t => t.team_key);
        const promiseArray = [];
        const currentWeek = parseInt(teams.current_week);
        for (let i = 0; i < teamKeys.length; i++) {
            const teamKey = teamKeys[i];
            for (let week = 1; week <= currentWeek; week++) {
                promiseArray.push(limit(() => YahooService.yf.api(YahooService.yf.GET, `https://fantasysports.yahooapis.com/fantasy/v2/team/${teamKey}/roster;week=${week}/players/stats;type=week;week=${week}`)));
            }
        }

        logger.info({ apiRequests: promiseArray.length }, "Making batch API requests to Yahoo for team data.");
        const result = await Promise.all(promiseArray);
        return result;
    }

    async gatherData(tid, provider, leagueKey) {
        const logger = setupLoggerWrapper(tid, "_gatherData", { __filename });
        logger.debug({ leagueKey }, "Gathering data for the league.");
        const gatherLeagueData = this.strategies[provider];
        if (!gatherLeagueData) {
            throw new ApplicationError(`Provider ${provider} not supported.`, tid);
        }
        return gatherLeagueData(tid, leagueKey);
    }
}

module.exports = new LeagueDataService();
