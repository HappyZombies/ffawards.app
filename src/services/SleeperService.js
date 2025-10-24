const { ApiError } = require("../errors");
const AuthService = require("./AuthService");
const axios = require("axios");
class SleeperService {

    async streamToString(stream) {
        const chunks = [];
        for await (const chunk of stream) chunks.push(chunk);
        return Buffer.concat(chunks).toString("utf-8");
    }

    async getLeagueData(tid, leagueId) {
        try {
            const response = await axios.get(`https://api.sleeper.app/v1/league/${leagueId}`);
            const data = response.data;
            return data;
        } catch (error) {
            throw new ApiError(error.message, tid);
        }
    }
    async fetchNFLState(tid) {
        const response = await axios.get("https://api.sleeper.app/v1/state/nfl");
        return response.data;
    }
    
    async fetchLeagueInfo(tid, leagueId) {
        const response = await axios.get(`https://api.sleeper.app/v1/league/${leagueId}`);
        return response.data;
    }
    
    async fetchRosters(tid, leagueId) {
        const response = await axios.get(`https://api.sleeper.app/v1/league/${leagueId}/rosters`);
        return response.data;
    }
    
    async fetchPlayers(tid) {
        const response = await axios.get("https://api.sleeper.app/v1/players/nfl");
        return response.data;
    }
    
    async fetchPlayerStats(tid, week) {
        const response = await axios.get(`https://api.sleeper.app/v1/stats/nfl/regular/2025/${week}`);
        return response.data;
    }
    
    async fetchUserById(userId) {
        const response = await axios.get(`https://api.sleeper.app/v1/user/${userId}`);
        return response.data;
    }

    async getUsersInLeague(tid, leagueId) {
        const response = await axios.get(`https://api.sleeper.app/v1/league/${leagueId}/users`);
        return response.data;
    }

    async fetchMatchups(tid, leagueId, week) {
        const response = await axios.get(`https://api.sleeper.app/v1/league/${leagueId}/matchups/${week}`);
        return response.data;
    }

    async fetchUserByUsername(tid, username) {
        const response = await axios.get(`https://api.sleeper.app/v1/user/${username}`);
        return response.data;
    }

    async fetchLeaguesByUserId(tid, userId, season) {
        const response = await axios.get(`https://api.sleeper.app/v1/user/${userId}/leagues/nfl/${season}`);
        return response.data;
    }

    async getLeaguesByUsernameAndSeason(tid, username, season) {
        // first get the username so we can get their id
        const user = await this.fetchUserByUsername(tid, username);
        if(!user) {
            return [];
        }
        // now, fetch the leagues
        const leagues = await this.fetchLeaguesByUserId(tid, user.user_id, season);
        return leagues;
    }

    async login(tid, sleeperLeagueId) {
        // first, validate that this is a real sleeper account
        let user, session;
        try {
            // first, validate that this is a real sleeper account
            const sleeperData = await this.getLeagueData(tid, sleeperLeagueId);
            const result = await AuthService.authenticateSleeper(tid, sleeperData);
            ({ user, session } = result); // Destructure and assign the result
            return { user, session };
        } catch (err) {
            throw new ApiError(err.message, tid);
        }
    }
}

module.exports = new SleeperService();
