const { setupLoggerWrapper } = require("../services/LoggerService");
const SleeperService = require("../services/SleeperService");
const { POSITION_MAP } = require("../utils/espnConstants");
const BaseAward = require("./BaseAward");
const { mapTeam, mapRoster } = require("yahoo-fantasy").teamHelper;

// TODO: In theory, this award COULD just be a generic "MostPointsAward" that takes a position as a parameter, have one loop that iterates and does the calculation, and then just returns the result.
// This would be a more generic approach and would allow for more flexibility in the future. However, this is a good starting point for now.
class ZeroPointsAward extends BaseAward {
    constructor(title, position, displayOrder = 1) {
        super(
            title,
            "Awarded to the manager whose starters recorded the most 0.0 or negative-point performances during the season."
        );
        this.title = title;
        this.id = "zero-points-award";
        this.displayOrder = displayOrder;
        this.insights = [
            {
                key: "zero_points_top",
                award_id: this.id,
                title: "Goose Egg Collector",
                direction: "top",
                weekly_description: "{team_name} stacked the most 0-point (or worse) starts this week.",
                season_description: "The team that led the league in 0.0 or negative-point performances all season.",
                icon: "🍩"
            }
        ];
        this.strategies = {
            yahoo: this._calculateYahooAward
            // Add more strategies for different providers
        };
    }

    build() {
        return new ZeroPointsAward(this.title, this.position, this.displayOrder).setId(this.id).setDataSet(this.result).setProvider(this.provider).setLeagueId(this.leagueId);
    }

    _calculateYahooAward = (tid) => {
        const logger = setupLoggerWrapper(tid, "_calculateYahooAward", { __filename });
        logger.debug({ leagueId: this.leagueId }, "Generating Most Points Award.");

        const totalPoints = {};
        const accumulativeTotalWeekly = {};
        const playersAccumulativeTotal = {};

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
            if (!accumulativeTotalWeekly[currentWeek][teamKey]) {
                accumulativeTotalWeekly[currentWeek][teamKey] = { total: 0, teamName: team.name };
            }
            if (!playersAccumulativeTotal[teamKey]) playersAccumulativeTotal[teamKey] = { teamName: team.name, total: 0, players: {} };

            for (let j = 0; j < team.roster.length; j++) {
                const player = team.roster[j];
                if (player.selected_position !== "BN" && player.selected_position !== "IR") {
                    const playerPoints = parseFloat(player.player_points.total, 10);
                    if (playerPoints <= 0) {
                        totalPoints[teamKey].total += 1;
                        accumulativeTotalWeekly[currentWeek][teamKey].total += 1;


                        const playerKey = player.player_key || `${player.player_id || player.name.full.toLowerCase()}`;
                        const playerName = `${player.name.full || playerKey} (${player.primary_position})`;
                        if (!playersAccumulativeTotal[teamKey].players[playerKey])
                            playersAccumulativeTotal[teamKey].players[playerKey] = { name: playerName, position: player.selected_position, total: 0, weekly: {} };
                        playersAccumulativeTotal[teamKey].players[playerKey].total += 1;
                        playersAccumulativeTotal[teamKey].players[playerKey].weekly[currentWeek] = (playersAccumulativeTotal[teamKey].players[playerKey].weekly[currentWeek] || 0) + 1;
                        playersAccumulativeTotal[teamKey].total += 1;
                    }
                }
            }
        }
        return { award_data: totalPoints, award_data_weekly: accumulativeTotalWeekly, player_data: playersAccumulativeTotal };
    };

    _pick(entries, direction, limit = 1) {
        const arr = Object.entries(entries).map(([id, v]) => ({ id, teamName: v.teamName, total: v.total }));
        arr.sort((a, b) => direction === "top" ? (b.total - a.total) : (a.total - b.total));
        return arr.slice(0, limit);
    }

    _pickWeekly(weeklyMap, direction, limit = 1) {
        const out = {};
        for (const wk of Object.keys(weeklyMap || {})) out[wk] = this._pick(weeklyMap[wk], direction, limit);
        return out;
    }

    _variantsFromInsights(award_data, award_data_weekly) {
        return (this.insights || []).map(v => ({
            key: v.key,
            award_id: v.award_id,
            direction: v.direction,
            title: v.title,
            copy: { weekly: v.weekly_description, season: v.season_description, icon: v.icon ?? null },
            winners_season: this._pick(award_data, v.direction, 1),
            winners_weekly: this._pickWeekly(award_data_weekly, v.direction, 1)
        }));
    }

    calculateAward = async (tid) => {
        const calculate = this.strategies[this.provider];
        if (!calculate) return {};
        const award_results = await calculate(tid);
        if (this.insights) {
            const variants = this._variantsFromInsights(award_results.award_data, award_results.award_data_weekly);
            return { ...award_results, variants };
        }
        return award_results;
    };
}

module.exports = ZeroPointsAward;
