const { setupLoggerWrapper } = require("../services/LoggerService");
const SleeperService = require("../services/SleeperService");
const { POSITION_MAP } = require("../utils/espnConstants");
const BaseAward = require("./BaseAward");
const { mapTeam, mapRoster } = require("yahoo-fantasy").teamHelper;

// TODO: In theory, this award COULD just be a generic "MostPointsAward" that takes a position as a parameter, have one loop that iterates and does the calculation, and then just returns the result.
// This would be a more generic approach and would allow for more flexibility in the future. However, this is a good starting point for now.
class MostPositionPointsAward extends BaseAward {
    constructor(title, position, displayOrder = 1) {
        super(title, `Awarded to the manager with the most points from the ${position} position during the season.`);
        this.title = title;
        this.position = position;
        this.id = `${position.toLowerCase()}-most-points-award`;
        this.displayOrder = displayOrder;
        this.insights = this._buildInsights();
        this.strategies = {
            yahoo: this._calculateYahooAward,
            sleeper: this._calculateSleeperAward,
            espn: this._calculateEspnAward
            // Add more strategies for different providers
        };
    }

    _buildInsights() {
        const iconMap = { QB:"🎯", RB:"🏃‍♂️", WR:"👐", TE:"🧲", K:"🦵", "W/R/T":"🔀", DEF:"🛡️", "D/ST":"🛡️" };
        
        const posLabel = this.position === "DEF" ? "D/ST" : this.position;
        const slug = (this.position === "W/R/T" ? "flex" : this.position).toLowerCase().replace(/[^a-z]/g,""); // qb, rb, wr, te, k, def, flex
        const title = this.position === "W/R/T" ? "Flex Maestro" : `${this.position} Points Leader`;
        return [{
            key: `${slug}_most_points_top`,
            award_id: this.id,
            direction: "top",
            title,
            weekly_description: `{team_name} squeezed the most ${posLabel} points this week.`,
            season_description: `The team that banked the most ${posLabel} points all season.`,
            icon: iconMap[this.position] || "📈"
        }];
    }

    build() {
        const award = new MostPositionPointsAward(this.title, this.position, this.displayOrder).setId(this.id).setDataSet(this.result).setProvider(this.provider).setLeagueId(this.leagueId);
        if (award.provider === "sleeper" && award.position === "W/R/T") {
            award.setDescription("Awarded to the manager with the most points from the FLEX position during the season.");
        }
        return award;
    }

    _calculateEspnAward = async (tid) => {
        const { allStatsByWeek: entireMatchups } = this.result;
        const accumulativeTotalWeekly = {};
        const totalPoints = {};

        let position = this.position;
        
        // handle the position name for ESPN, as they use different names for certain positions.
        if (this.position === "W/R/T") {
            // ESPN calls this position "RB/WR/TE", meanwhile Yahoo calls it "W/R/T"
            position = "RB/WR/TE";
        } else if (this.position === "DEF") {
            position = "D/ST";
        }

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
                
                // an away or home team can be empty if the team is on a bye week.
                if (team1 && !totalPoints[team1.teamId]) {
                    totalPoints[team1.teamId] = { total: 0, teamName: this.result.playerPoints[team1.teamId].teamName };
                }
                if (team2 && !totalPoints[team2.teamId]) {
                    totalPoints[team2.teamId] = { total: 0, teamName: this.result.playerPoints[team2.teamId].teamName };
                }
                if(team1 && !accumulativeTotalWeekly[currentWeek][team1.teamId]) {
                    accumulativeTotalWeekly[currentWeek][team1.teamId] = { total: 0, teamName: this.result.playerPoints[team1.teamId].teamName  };
                }
                if(team2 && !accumulativeTotalWeekly[currentWeek][team2.teamId]) {
                    accumulativeTotalWeekly[currentWeek][team2.teamId] = { total: 0, teamName: this.result.playerPoints[team2.teamId].teamName  };
                }
                
                for (let i = 0; i < team1?.rosterForCurrentScoringPeriod?.entries.length; i++) {
                    const player = team1.rosterForCurrentScoringPeriod.entries[i];
                    const { lineupSlotId } = player;
                    const positionName = POSITION_MAP[lineupSlotId];
                    // or really based off the mapping above
                    if (positionName === position) {
                        // console.log(player.playerPoolEntry.player.fullName, player.playerPoolEntry.appliedStatTotal);
                        const playerPoints = player.playerPoolEntry.appliedStatTotal;
                        if (playerPoints) {
                            totalPoints[team1.teamId].total += playerPoints;
                            accumulativeTotalWeekly[currentWeek][team1.teamId].total += playerPoints;
                        }
                    }
                }
            
                for (let i = 0; i < team2?.rosterForCurrentScoringPeriod?.entries.length; i++) {
                    const player = team2.rosterForCurrentScoringPeriod.entries[i];
                    const { lineupSlotId } = player;
                    const positionName = POSITION_MAP[lineupSlotId];
                    // or really based off the mapping above
                    if (positionName === position) {
                        const playerPoints = player.playerPoolEntry.appliedStatTotal;
                        if (playerPoints) {
                            totalPoints[team2.teamId].total += playerPoints;
                            accumulativeTotalWeekly[currentWeek][team2.teamId].total += playerPoints;
                        }
                    }
                }

            }

        }

        return { award_data: totalPoints, award_data_weekly: accumulativeTotalWeekly };
    };

    _calculateSleeperAward = async (tid) => {
        // Note about how this works:
        // 1. Get the starting positions from the league settings
        const startingPositions = this.result.leagueSettings.roster_positions;
        // the first 10 positions are the starting positions, IN order -- they equal to the player position.
        let position = this.position;
        if (this.position === "W/R/T") {
            // Sleeper calls this position "FLEX", meanwhile Yahoo calls it "W/R/T"
            position = "FLEX";
        }
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
            const { starters: starting_players } = matchup;
            if (starting_players === null) {
                // this means user didn't start anyone or none of the players are in the starting lineup or the week hasn't really started yet... idk?
                continue;
            }
            for (let i = 0; i < starting_players.length; i++) {
                const player_id = starting_players[i];
                if (player_id === "0") {
                    // this means either user didn't start anyone or ... idk?
                    continue;
                }
                // const player = SleeperService.sleepersPlayersMap.get(player_id);
                // const playerStats = await SleeperService.fetchPlayerStats(week);
                // How this works: as we iterate over the starting players, we check if the player's position matches the position we're looking for by checking the startingPositions array.
                // This array is in order of the positions, so we can just check against the index.
                if (startingPositions[i] === position) {
                    let playerPoints = parseFloat(matchup.players_points[player_id], 10);

                    // Fallback to starters_points if players_points is undefined, this can occur if the player was added/dropped/traded to the roster after the week started.
                    // this can be either from a trade or a commissioner action
                    if (isNaN(playerPoints)) {
                        const playerPointsFallback = parseFloat(matchup.starters_points[i], 10); // honestly probably zero, but just in case.
                        // log this as a warning, as this is a fallback and should be rare.
                        playerPoints = isNaN(playerPointsFallback) ? 0 : playerPointsFallback;
                    }
                    totalPoints[userId].total += playerPoints;
                    accumulativeTotalWeekly[currentWeek][userId].total += playerPoints;
                }
            }
        }
        return { award_data: totalPoints, award_data_weekly: accumulativeTotalWeekly };
    };

    _calculateYahooAward = (tid) => {
        const logger = setupLoggerWrapper(tid, "_calculateYahooAward", { __filename });
        logger.debug({ leagueId: this.leagueId, position: this.position }, "Generating most points award.");
        const accumulativeTotal = {};
        const accumulativeTotalWeekly = {};
        const playersAccumulativeTotal = {};
        for (let index = 0; index < this.result.length; index++) {
            const team = mapTeam(this.result[index].fantasy_content.team[0]);
            const mappedRoster = mapRoster(this.result[index].fantasy_content.team[1].roster);
            const currentWeek = this.result[index].fantasy_content.team[1].roster.week;
            team.roster = mappedRoster;
            const teamKey = team.team_key;

            if (!accumulativeTotal[teamKey]) {
                accumulativeTotal[teamKey] = { total: 0, teamName: team.name };
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
                if (player.selected_position === this.position) {
                    const playerStats = parseFloat(player.player_points.total, 10) || 0;
                    const playerKey = player.player_key || `${player.player_id || player.name.full.toLowerCase()}`;
                    const playerName = `${player.name.full || playerKey} (${player.primary_position})`;

                    accumulativeTotal[teamKey].total += playerStats;
                    accumulativeTotalWeekly[currentWeek][teamKey].total += playerStats;

                    if (!playersAccumulativeTotal[teamKey].players[playerKey])
                        playersAccumulativeTotal[teamKey].players[playerKey] = { name: playerName, position: player.selected_position, total: 0, weekly: {} };

                    playersAccumulativeTotal[teamKey].players[playerKey].total += playerStats;
                    playersAccumulativeTotal[teamKey].players[playerKey].weekly[currentWeek] = (playersAccumulativeTotal[teamKey].players[playerKey].weekly[currentWeek] || 0) + playerStats;
                    playersAccumulativeTotal[teamKey].total += playerStats;
                }
            }
        }

        logger.debug({ leagueId: this.leagueId, accumulativeTotal }, "Most points award calculation complete.");
        return { award_data: accumulativeTotal, award_data_weekly: accumulativeTotalWeekly, player_data: playersAccumulativeTotal };
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

module.exports = MostPositionPointsAward;
