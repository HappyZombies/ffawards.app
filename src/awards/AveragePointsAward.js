const { setupLoggerWrapper } = require("../services/LoggerService");
const YahooService = require("../services/YahooService");
const BaseAward = require("./BaseAward");
const { mapTeam, mapRoster } = require("yahoo-fantasy").teamHelper;

class AveragePointsAward extends BaseAward {
    constructor(title, displayOrder = 1) {
        super(title, "Awarded to the manager who scored the overall average points during the season (includes total BYE weeks).");
        this.title = title;
        this.id = "average-points-award";
        this.displayOrder = displayOrder;
        this.strategies = {
            yahoo: this._calculateYahooAward,
            sleeper: this._calculateSleeperAward
            // Add more strategies for different providers
        };
    }

    build() {
        return new AveragePointsAward(this.title, this.displayOrder).setId(this.id).setDataSet(this.result).setProvider(this.provider).setLeagueId(this.leagueId);
    }

    _calculateSleeperAward = async (tid) => {
        const totalPoints = {};
        const accumulativeTotalWeekly = {};
        let currentWeek;
        for (let i = 0; i < this.result.matchups.length; i++) {
            const matchup = this.result.matchups[i];
            currentWeek = matchup.week;
            const rosterId = matchup.roster_id;
            // need the roster JUST to get the owner_id
            const roster = this.result.rosters.find(r => r.roster_id === rosterId);
            if (!roster.owner_id) {
                // filter our an ownerless team, we will skip them for now.
                // TODO: Do we want to do anything with these teams?
                continue;
            }
            const { owner_id: userId } = roster;
            // Initialize total points for the team if not done yet
            if (!totalPoints[userId]) {
                const user = this.result.users.get(userId);
                const { team_name } = user.metadata;
                totalPoints[userId] = { total: 0, teamName: team_name };
            }
            if (!accumulativeTotalWeekly[currentWeek]) {
                accumulativeTotalWeekly[currentWeek] = {};
            }
            if (!accumulativeTotalWeekly[currentWeek][userId]) {
                const user = this.result.users.get(userId);
                const { team_name } = user.metadata;
                accumulativeTotalWeekly[currentWeek][userId] = { total: 0, teamName: team_name };
            }
            const points = parseFloat(matchup.points, 10);
            totalPoints[userId].total += points;  // Sum the starter player's points
            accumulativeTotalWeekly[currentWeek][userId].total += points;
        }

        // Calculate average points for each team
        for (const teamKey in totalPoints) {
            const total = totalPoints[teamKey].total;
            totalPoints[teamKey].total = total / (this.result.leagueSettings?.settings?.last_scored_leg ? this.result.leagueSettings.settings.last_scored_leg : currentWeek);
        }
        return { award_data: totalPoints, award_data_weekly: null };
    };

    _calculateYahooAward = async (tid) => {
        const logger = setupLoggerWrapper(tid, "_calculateYahooAward", { __filename });
        logger.debug({ leagueId: this.leagueId }, "Generating Most Points Award.");
        const league = await YahooService.yf.league.settings(this.leagueId);
        const totalPoints = {};
        const weeksPlayed = {}; // Track the number of weeks played per team

        for (let index = 0; index < this.result.length; index++) {
            const team = mapTeam(this.result[index].fantasy_content.team[0]);
            const teamKey = team.team_key;
            const mappedRoster = mapRoster(this.result[index].fantasy_content.team[1].roster);
            team.roster = mappedRoster;
            const currentWeek = this.result[index].fantasy_content.team[1].roster.week;

            if (!totalPoints[teamKey]) {
                totalPoints[teamKey] = { total: 0, teamName: team.name, average: 0 };
                weeksPlayed[teamKey] = new Set(); // Use a Set to track unique weeks
            }

            // Add the current week to the Set of weeks played
            weeksPlayed[teamKey].add(currentWeek);

            for (let j = 0; j < team.roster.length; j++) {
                const player = team.roster[j];
                if (player.selected_position !== "BN") {
                    const playerPoints = parseFloat(player.player_points.total, 10);
                    totalPoints[teamKey].total += playerPoints;
                }
            }
        }

        // Calculate average points for each team
        for (const teamKey in totalPoints) {
            const total = totalPoints[teamKey].total;
            const uniqueWeeks = weeksPlayed[teamKey].size; // Get the number of unique weeks played
            totalPoints[teamKey].total = uniqueWeeks > 0 ? total / league.matchup_week : 0;
        }

        logger.debug({ leagueId: this.leagueId, totalPoints }, "Most Points Award calculation complete.");
        return { award_data: totalPoints, award_data_weekly: null };
    };


    calculateAward = async (tid) => {
        const calculate = this.strategies[this.provider];
        if (!calculate) {
            return {};
        }
        return calculate(tid);
    };
}

module.exports = AveragePointsAward;
