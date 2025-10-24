const { ApiError } = require("../errors");
const { setupLoggerWrapper } = require("../services/LoggerService");
const BaseAward = require("./BaseAward");
const { mapTeam, mapRoster } = require("yahoo-fantasy").teamHelper;

class TotalBenchPointsAward extends BaseAward {
    constructor(title, displayOrder = 1) {
        super(title, "Awarded to the manager who scored the most total points on their bench.");
        this.title = title;
        this.id = "total-bench-points-award";
        this.insights = [
            {
                key:"most_bench_points_top",
                award_id: this.id,
                direction: "top",
                title: "Bench Blunder",
                weekly_description: "{team_name} left the most points sitting on the bench this week.",
                season_description: "The team that benched the most potential points all season long.",
                icon: "🪑"
            }
          ];
        this.displayOrder = displayOrder;
        this.strategies = {
            yahoo: this._calculateYahooAward,
            sleeper: this._calculateSleeperAward
        };
    }

    _calculateSleeperAward = async (tid) => {
        const totalPoints = {};
        const accumulativeTotalWeekly = {};
        for (let i = 0; i < this.result.matchups.length; i++) {
            const matchup = this.result.matchups[i];
            const rosterId = matchup.roster_id;
            const currentWeek = matchup.week;
            // just need the roster to get the players ids
            const roster = this.result.rosters.find(r => r.roster_id === rosterId);
            if (!roster.owner_id) {
                // filter our an ownerless team, we will skip them for now.
                // TODO: Do we want to do anything with these teams?
                continue;
            }
            const { owner_id: userId } = roster;
            if (!totalPoints[userId]) {
                const user = this.result.users.get(userId);
                const { team_name } = user.metadata;
                totalPoints[userId] = { total: 0, teamName: team_name }; 
            }
            if (!accumulativeTotalWeekly[currentWeek]) {
                accumulativeTotalWeekly[currentWeek] = {};
            }
            if(!accumulativeTotalWeekly[currentWeek][userId]) {
                const user = this.result.users.get(userId);
                const { team_name } = user.metadata;
                accumulativeTotalWeekly[currentWeek][userId] = { total: 0, teamName: team_name };
            }
            const { starters: starting_players, players } = matchup;
            if (starting_players === null) {
                // this means user didn't start anyone or none of the players are in the starting lineup or the week hasn't really started yet... idk?
                continue;
            }
            const bench_players = players.filter(player_id => !starting_players.includes(player_id));
            for (let i = 0; i < bench_players.length; i++) {
                const benchPlayerId = bench_players[i];
                const playerPoints = parseFloat(matchup.players_points[benchPlayerId], 10);
                totalPoints[userId].total += playerPoints;
                accumulativeTotalWeekly[currentWeek][userId].total += playerPoints;
            }
        }
        return { award_data: totalPoints, award_data_weekly: accumulativeTotalWeekly };
    };

    build() {
        return new TotalBenchPointsAward(this.title, this.displayOrder).setId(this.id).setDataSet(this.result).setProvider(this.provider).setLeagueId(this.leagueId);
    }

    _calculateYahooAward = async (tid) => {
        const logger = setupLoggerWrapper(tid, "_calculateYahooAward", { __filename });
        logger.debug({ leagueId: this.leagueId }, "Generating Most Points Award.");

        const totalPoints = {};
        const accumulativeTotalWeekly = {};
        for (let index = 0; index < this.result.length; index++) {
            const team = mapTeam(this.result[index].fantasy_content.team[0]);
            const teamKey = team.team_key;
            const mappedRoster = mapRoster(this.result[index].fantasy_content.team[1].roster);
            const currentWeek = this.result[index].fantasy_content.team[1].roster.week;
            team.roster = mappedRoster;
    
            if (!totalPoints[teamKey]) {
                totalPoints[teamKey] = { total: 0, teamName: team.name };
            }
            if (!accumulativeTotalWeekly[currentWeek]) {
                accumulativeTotalWeekly[currentWeek] = {};
            }
            if(!accumulativeTotalWeekly[currentWeek][teamKey]) {
                accumulativeTotalWeekly[currentWeek][teamKey] = { total: 0, teamName: team.name };
            }

    
            for (let j = 0; j < team.roster.length; j++) {
                const player = team.roster[j];
                if (player.selected_position === "BN") {
                    const playerPoints = parseFloat(player.player_points.total, 10);
                    totalPoints[teamKey].total += playerPoints;
                    accumulativeTotalWeekly[currentWeek][teamKey].total += playerPoints;
                }
            }
        }
        return { award_data: totalPoints, award_data_weekly: accumulativeTotalWeekly };
    };

    _pick(entries, direction, limit = 1) {
        const arr = Object.entries(entries).map(([id, v]) => ({ id, teamName: v.teamName, total: v.total }));
        arr.sort((a, b) => direction === "top" ? (b.total - a.total) : (a.total - b.total));
        return arr.slice(0, limit);
      }
    
      _pickWeekly(weeklyMap, direction, limit = 1) {
        const out = {};
        for (const wk of Object.keys(weeklyMap || {})) {
          out[wk] = this._pick(weeklyMap[wk], direction, limit);
        }
        return out;
      }

    _variantsFromInsights(award_data, award_data_weekly) {
        return this.insights.map(v => ({
          key: v.key,
          award_id: v.award_id,
          direction: v.direction,                 // "top" | "bottom"
          title: v.title,
          copy: { weekly: v.weekly_description, season: v.season_description, icon: v.icon ?? null },
          winners_season: this._pick(award_data, v.direction, 1),
          winners_weekly: this._pickWeekly(award_data_weekly, v.direction, 1)
        }));
      }


    calculateAward = async (tid) => {
        const calculate = this.strategies[this.provider];
        if (!calculate) {
            return {};
        }
        const award_results = await calculate(tid);
        if(this.insights) {
            const variants = this._variantsFromInsights(award_results.award_data, award_results.award_data_weekly);
            return {...award_results, variants };
        }
        return award_results;
    };
}

module.exports = TotalBenchPointsAward;
