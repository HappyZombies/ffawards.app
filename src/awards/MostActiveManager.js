const { ApiError } = require("../errors");
const { setupLoggerWrapper } = require("../services/LoggerService");
const SleeperService = require("../services/SleeperService");
const YahooService = require("../services/YahooService");
const BaseAward = require("./BaseAward");
const { mapTeam, mapRoster } = require("yahoo-fantasy").teamHelper;

class MostActiveManager extends BaseAward {
  constructor(title, displayOrder = 1) {
    super(title, "Awarded to the manager who made the most roster moves (adds, drops, trades, waivers) so far.");
    this.title = title;
    this.id = "most-active-award";
    this.displayOrder = displayOrder;
    this.insights = [{
      key: "most_active_top",
      award_id: this.id,
      direction: "top",
      title: "Waiver Wire Warrior",
      season_description: "The team that made the most roster moves this season.",
      icon: "🔄"
    }];
    this.strategies = { yahoo: this._calculateYahooAward };
  }

  build() {
    return new MostActiveManager(this.title, this.displayOrder).setId(this.id).setDataSet(this.result).setProvider(this.provider).setLeagueId(this.leagueId);
  }


  _calculateYahooAward = async (tid) => {
    const logger = setupLoggerWrapper(tid, "_calculateYahooAward", { __filename });
    logger.debug({ leagueId: this.leagueId, stat: this.tdStatAbbr }, "Generating most TD award.");

    const allStatPoints = {};

    for (let index = 0; index < this.result.length; index++) {
      const team = mapTeam(this.result[index].fantasy_content.team[0]);
      const teamKey = team.team_key;

      if (!allStatPoints[teamKey]) {
        allStatPoints[teamKey] = { total: team.number_of_moves, teamName: team.name };
      }
    }

    logger.debug({ leagueId: this.leagueId, allStatPoints }, "Most stat award calculation complete.");
    return { award_data: allStatPoints };
  };

  _pick(entries, direction, limit = 1) {
    const arr = Object.entries(entries).map(([id, v]) => ({ id, teamName: v.teamName, total: v.total }));
    arr.sort((a, b) => direction === "top" ? (b.total - a.total) : (a.total - b.total));
    return arr.slice(0, limit);
  }

  _variantsFromInsights(award_data) {
    return this.insights.map(v => ({
      key: v.key,
      award_id: v.award_id,
      direction: v.direction,                 // "top" | "bottom"
      title: v.title,
      copy: { weekly: v.weekly_description, season: v.season_description, icon: v.icon ?? null },
      winners_season: this._pick(award_data, v.direction, 1)
    }));
  }


  calculateAward = async (tid) => {
    const calculate = this.strategies[this.provider];
    if (!calculate) {
      return {};
    }
    const award_results = await calculate(tid);
    if (this.insights) {
      const variants = this._variantsFromInsights(award_results.award_data);
      return { ...award_results, variants };
    }
    return award_results;
  };
}

module.exports = MostActiveManager;
