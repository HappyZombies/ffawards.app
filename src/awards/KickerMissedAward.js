const { ApiError } = require("../errors");
const { setupLoggerWrapper } = require("../services/LoggerService");
const SleeperService = require("../services/SleeperService");
const YahooService = require("../services/YahooService");
const BaseAward = require("./BaseAward");
const { mapTeam, mapRoster } = require("yahoo-fantasy").teamHelper;

class KickerMissedAward extends BaseAward {
    constructor(title, displayOrder = 1) {
        super(title, "Awarded to the manager whose kicker missed the most kicks during the season (includes missed FG and PAT).");
        this.title = title;
        this.id = "kicking-woes-award";
        this.insights = [
          {
            key: "most_kicking_misses_top",
            award_id: this.id,
            direction: "top",
            title: "Kicking Woes",
            weekly_description: "{team_name} kicker must've left their leg at home this week.",
            season_description: "The team whose kicker missed the most field goals and extra points all season.",
            icon: "🥴"
          }
        ];
        this.displayOrder = displayOrder;
        this.strategies = {
          yahoo: this._calculateYahooAward
          // Add more strategies for different providers
        };
    }

    build() {
        return new KickerMissedAward(this.title, this.displayOrder).setId(this.id).setDataSet(this.result).setProvider(this.provider).setLeagueId(this.leagueId);
    }


    _calculateYahooAward = async (tid) => {
        const logger = setupLoggerWrapper(tid, "_calculateYahooAward", { __filename });
        logger.debug({ leagueId: this.leagueId, stat: this.tdStatAbbr }, "Generating most TD award.");

        const league = await YahooService.yf.league.settings(this.leagueId);
        logger.debug({ leagueId: this.leagueId, league }, "Found league settings");
        // NOTE: This is hard coded, since not every league could have this enabled, but it's still tracked anyways.
        const intStat = [{stat_id: 24}, {stat_id: 25}, {stat_id: 26}, {stat_id: 27}, {stat_id: 28}, {stat_id: 30}];
        logger.debug({ leagueId: this.leagueId, intStat }, "intStat allegedly...");

        const allStatPoints = {};
        const accumulativeTotalWeekly = {};
        const playersAccumulativeTotal = {};

        for (let index = 0; index < this.result.length; index++) {
            const team = mapTeam(this.result[index].fantasy_content.team[0]);
            const mappedRoster = mapRoster(this.result[index].fantasy_content.team[1].roster);
            team.roster = mappedRoster;
            const currentWeek = this.result[index].fantasy_content.team[1].roster.week;
            const teamKey = team.team_key;

            if (!allStatPoints[teamKey]) {
                allStatPoints[teamKey] = { total: 0, teamName: team.name };
            }
            if (!accumulativeTotalWeekly[currentWeek]) {
                accumulativeTotalWeekly[currentWeek] = {};
            }
            if(!accumulativeTotalWeekly[currentWeek][teamKey]) {
                accumulativeTotalWeekly[currentWeek][teamKey] = { total: 0, teamName: team.name };
            }
            if (!playersAccumulativeTotal[teamKey]) playersAccumulativeTotal[teamKey] = { teamName: team.name, total: 0, players: {} };

            for (let j = 0; j < team.roster.length; j++) {
                const player = team.roster[j];
                if (player.selected_position === "K") {
                    const playerTdStats = player.player_stats.stats.filter(playerStat =>
                        intStat.some(tdStat => tdStat.stat_id === parseInt(playerStat.stat_id))
                    );
                    const totalTdPoints = playerTdStats.reduce((total, stat) => total + parseInt(stat.value), 0);
                    if (totalTdPoints !== 0) {
                        allStatPoints[teamKey].total += totalTdPoints;
                        accumulativeTotalWeekly[currentWeek][teamKey].total += totalTdPoints;
                        
                        const playerKey = player.player_key || `${player.player_id || player.name.full.toLowerCase()}`;
                        const playerName = `${player.name.full || playerKey} (${player.primary_position})`;
                        if (!playersAccumulativeTotal[teamKey].players[playerKey])
                            playersAccumulativeTotal[teamKey].players[playerKey] = { name: playerName, position: player.selected_position, total: 0, weekly: {} };
                        playersAccumulativeTotal[teamKey].players[playerKey].total += totalTdPoints;
                        playersAccumulativeTotal[teamKey].players[playerKey].weekly[currentWeek] = (playersAccumulativeTotal[teamKey].players[playerKey].weekly[currentWeek] || 0) + totalTdPoints;
                        playersAccumulativeTotal[teamKey].total += totalTdPoints;
                    }

                }
            }
        }

        logger.debug({ leagueId: this.leagueId, allStatPoints }, "Most stat award calculation complete.");
        return { award_data: allStatPoints, award_data_weekly: accumulativeTotalWeekly, player_data: playersAccumulativeTotal };
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

module.exports = KickerMissedAward;
