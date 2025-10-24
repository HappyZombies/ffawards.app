const { ApiError } = require("../errors");
const axios = require("axios");
const AuthService = require("./AuthService");

// TODO: No hardcoded
const season = 2025;
const FANTASY_BASE_ENDPOINT = `https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons/${season}`;

class ESPNService {
    espn_s2 = null;
    swid = null;

    setCookies(espn_s2, swid) {
        this.espn_s2 = espn_s2;
        this.swid = swid;
    }

    buildHeaders(extra = {}) {
        const headers = { ...extra };
        if (this.espn_s2 && this.swid) {
            headers.Cookie = `espn_s2=${this.espn_s2}; SWID=${this.swid}`;
        }
        return headers;
    }

    async getGameData(tid) {
        const url = FANTASY_BASE_ENDPOINT;
        const response = await axios.get(url, { headers: this.buildHeaders() });
        return response.data;
    }

    async getLeagueData(tid, leagueId) {
        const url = `${FANTASY_BASE_ENDPOINT}/segments/0/leagues/${leagueId}?view=mSettings`;
        const response = await axios.get(url, { headers: this.buildHeaders() });
        return response.data;
    }

    async getLeagueAndTeamData(tid, leagueId) {
        const url = `${FANTASY_BASE_ENDPOINT}/segments/0/leagues/${leagueId}?view=mTeam&view=mSettings`;
        const response = await axios.get(url, { headers: this.buildHeaders() });
        return response.data;
    }

    async getMatchupScoreByWeek(tid, leagueId, week) {
        const url = `${FANTASY_BASE_ENDPOINT}/segments/0/leagues/${leagueId}?view=mMatchupScore&view=mScoreboard&scoringPeriodId=${week}`;
        const filter = { schedule: { filterMatchupPeriodIds: { value: [week] } } };
        const headers = this.buildHeaders({ "x-fantasy-filter": JSON.stringify(filter) });
        const response = await axios.get(url, { headers });
        return response.data;
    }

    async login(tid, leagueId) {
        try {
            const espnData = await this.getLeagueData(tid, leagueId);
            const result = await AuthService.authenticatePublicESPN(tid, espnData);
            const { user, session } = result;
            return { user, session };
        } catch (err) {
            throw new ApiError(err.message, tid);
        }
    }
}

module.exports = new ESPNService();
