const CONSTANTS = {
        SESSION_TOKEN: "session_token",
        YAHOO_ACCESS_TOKEN: "yahoo_access_token",
        YAHOO_REFRESH_TOKEN: "yahoo_refresh_token",
        SLEEPER_LEAGUE_ID: "sleeper_league_id",
        ESPN_LEAGUE_ID: "espn_league_id",
        ESPN_S2: "espn_s2",
        SWID: "swid",
};

const clearAllAuthCookies = (res) => {
    res.clearCookie(CONSTANTS.SESSION_TOKEN);
    res.clearCookie(CONSTANTS.YAHOO_ACCESS_TOKEN);
    res.clearCookie(CONSTANTS.YAHOO_REFRESH_TOKEN);
    res.clearCookie(CONSTANTS.SLEEPER_LEAGUE_ID);
    res.clearCookie(CONSTANTS.ESPN_LEAGUE_ID);
    res.clearCookie(CONSTANTS.ESPN_S2);
    res.clearCookie(CONSTANTS.SWID);
};

module.exports = {
    CONSTANTS,
    clearAllAuthCookies
};
