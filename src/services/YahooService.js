const YahooFantasy = require("yahoo-fantasy");
const { ApiError } = require("../errors");
const { toLeagueEntityFromYahoo } = require("../utils/dynamoEntities");

const { CONSUMER_KEY, CONSUMER_SECRET, YAHOO_CALLBACK_URL } = process.env;

class YahooService {
    constructor () {
        this.yf = new YahooFantasy(
            CONSUMER_KEY,
            CONSUMER_SECRET,
            () => { },
            YAHOO_CALLBACK_URL
        );
        this.league_id = null;
    }

    // TODO: Method not being used, consider removing
    async retrieveLeagueMetadata(leagueKey) {
        try {
            const meta = await this.yf.league.meta(leagueKey);
            return meta;
        } catch (e) {
            console.log({e});
            throw e;
        }
    }

    async generateLeagueKey(game_codes, seasons) {
        const data = await this.yf.api(this.yf.GET, `https://fantasysports.yahooapis.com/fantasy/v2/games;game_codes=${game_codes};seasons=${seasons}`);
        const game = data.fantasy_content.games[0].game[0];
        const GAME_KEY = game.game_key;
        const LEAGUE_KEY = `${GAME_KEY}.l`;
        return LEAGUE_KEY;
    }

    async getLeague(leagueKey, tid) {
        try {
            const data = await this.yf.league.meta(leagueKey);
            return data;
        } catch(err) {
            throw new ApiError("Failed to get league from Yahoo API.", tid, err);
        }
    }

    async getLeagues(tid, startingRange = 2023) {
        const seasons = this._getAllYears(startingRange);
        try {
            const data = await this.yf.api(this.yf.GET, `https://fantasysports.yahooapis.com/fantasy/v2/users;use_login=1/games;game_codes=nfl;seasons=${seasons}/leagues`);
            const leagues = this._mapLeagues(data.fantasy_content.users[0].user[1].games);
            return leagues;
        } catch(err) {
            throw new ApiError("Failed to get leagues from Yahoo API", tid, err);
        }
    }

    // * NOTE: This object is specifically catered for how the API request to getLeagues(), looks like. Changes to that endpoint will/can change this method implementation 
    _mapLeagues(yahooLeaguesObject) {
        const allLeagues = [];
        for (let i = 0; i < yahooLeaguesObject.count; i++) {
            const { leagues } = yahooLeaguesObject[i].game[1];
            for (let k = 0; k < leagues.count; k++) {
                // maybe make a builder class to do league.setLogoUrl(logo_url).setLeagueType(league_type).setIsFinished(is_finished).etc
                const league = leagues[k].league[0];
                league.logo_url = league?.logo_url === false ? null : league.logo_url;
                league.is_finished = league.is_finished === 1; // yahoo supplies 1 if finished, or undefined if it's not. 
                allLeagues.push(toLeagueEntityFromYahoo(league));
            }
        }
        return allLeagues;
    }

    _getAllYears(startYear){
        const currentYear = new Date().getFullYear();
        let years = [];
        for (let year = startYear; year <= currentYear; year++) {
            years.push(year);
        }
        return years.join(",");
    };
}

module.exports = new YahooService();
