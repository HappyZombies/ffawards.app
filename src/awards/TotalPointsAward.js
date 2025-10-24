const { ApiError } = require("../errors");
const { setupLoggerWrapper } = require("../services/LoggerService");
const BaseAward = require("./BaseAward");
const { mapTeam, mapRoster } = require("yahoo-fantasy").teamHelper;

class TotalPointsAward extends BaseAward {
    constructor(title, displayOrder = 1) {
        super(title, "Awarded to the manager who scored the most total points during the season (includes total BYE weeks).");
        this.title = title;
        this.id = "total-points-award";
        this.insights = [
            { 
              key:"most_points_top",
              award_id: this.id,
              direction: "top",
              title:"Highest Scorer",
              weekly_description:"{team_name} scored the most points this week.",
              season_description:"The highest-scoring squad across the season.",
              icon: "🥇"
            },
            {
              key:"most_points_bottom",
              award_id: this.id,
              direction: "bottom",
              title:"Lowest Scorer",
              weekly_description:"{team_name} posted the fewest points this week.",
              season_description:"The lowest total points across the season.", 
              icon: "🚽"
            }
          ];
        this.displayOrder = displayOrder;
        this.strategies = {
            yahoo: this._calculateYahooAward,
            sleeper: this._calculateSleeperAward,
            espn: this._calculateEspnAward
            // Add more strategies for different providers
        };
    }

    build() {
        return new TotalPointsAward(this.title, this.displayOrder).setId(this.id).setDataSet(this.result).setProvider(this.provider).setLeagueId(this.leagueId);
    }

    _calculateEspnAward = async (tid) => {
        const { allStatsByWeek: entireMatchups } = this.result;
        const accumulativeTotalWeekly = {};

        // get the scores by week 
        for (let i = 0; i < entireMatchups.length; i++) {
            const matchup = entireMatchups[i];
            const currentWeek = matchup.scoringPeriodId;
            if (!accumulativeTotalWeekly[currentWeek]) {
                accumulativeTotalWeekly[currentWeek] = {};
            }
            for (let i = 0; i < matchup.schedule.length; i++) {
                const schedule = matchup.schedule[i];

                const { away: team1, home: team2 } = schedule;
            
                if(team1 && !accumulativeTotalWeekly[currentWeek][team1.teamId]) {
                    accumulativeTotalWeekly[currentWeek][team1.teamId] = { total: team1.totalPoints, teamName: this.result.playerPoints[team1.teamId].teamName  };
                }
                if(team2 && !accumulativeTotalWeekly[currentWeek][team2.teamId]) {
                    accumulativeTotalWeekly[currentWeek][team2.teamId] = { total: team2.totalPoints, teamName: this.result.playerPoints[team2.teamId].teamName  };
                }
            }

        }

        return { award_data: this.result.playerPoints, award_data_weekly: accumulativeTotalWeekly };
    };

    _calculateSleeperAward = async (tid) => {
        const totalPoints = {};
        const accumulativeTotalWeekly = {};
        for (let i = 0; i < this.result.matchups.length; i++) {
            const matchup = this.result.matchups[i];
            const currentWeek = matchup.week;
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
            if(!accumulativeTotalWeekly[currentWeek][userId]) {
                const user = this.result.users.get(userId);
                const { team_name } = user.metadata;
                accumulativeTotalWeekly[currentWeek][userId] = { total: 0, teamName: team_name };
            }
            const points = parseFloat(matchup.points, 10); 
            totalPoints[userId].total += points;  // Sum the starter player's points
            accumulativeTotalWeekly[currentWeek][userId].total += points;
        }
        return { award_data: totalPoints, award_data_weekly: accumulativeTotalWeekly };
    };

    _calculateYahooAward = async (tid) => {
        const logger = setupLoggerWrapper(tid, "_calculateYahooAward", { __filename });
        logger.debug({ leagueId: this.leagueId }, "Generating Most Points Award.");

        const totalPoints = {};
        const accumulativeTotalWeekly = {};
        for (let index = 0; index < this.result.length; index++) {
            const team = mapTeam(this.result[index].fantasy_content.team[0]);
            const teamKey = team.team_key;
            const mappedRoster = mapRoster(this.result[index].fantasy_content.team[1].roster);
            team.roster = mappedRoster;
            const currentWeek = this.result[index].fantasy_content.team[1].roster.week;
    
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
                if (player.selected_position !== "BN") {
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

module.exports = TotalPointsAward;
