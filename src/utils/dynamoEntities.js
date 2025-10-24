const generateUserEntityPK = (username, provider, providerAccountId) => {
    return `USER#${username}#PROVIDER#${provider}#PROVIDERID#${providerAccountId}`;
};

const generateSessionEntitySK = (sessionToken) => {
    return `SESSION#${sessionToken}`;
};

const generateLeagueEntitySK = (provider, leagueId) => {
    return `LEAGUE#${provider}#ID#${leagueId}`;
};

const generateAccumulativeAwardSK = (awardId) => {
    return `AWARD#TYPE#ACCUMULATIVE#ID#${awardId}`;
};

const generateWeeklyAwardSK = (awardId, week) => {
    return `AWARD#TYPE#WEEKLY#WEEK#${week}#ID#${awardId}`;
};

const toUserEntity = (item) => {
    if (!item) return null;
    return {
        PK: item.PK,
        entity_type: item.entity_type,
        username: item.username,
        provider: item.provider,
        provider_user_id: item.provider_user_id,
        token_expiry: item.token_expiry,
        created_at: item.created_at,
        update_at: item.update_at
    };
};

const toLeagueEntityFromYahoo = (yahooLeague) => {
    return {
        league_key: yahooLeague.league_key,
        league_id: parseInt(yahooLeague.league_id),
        name: yahooLeague.name,
        season: yahooLeague.season,
        current_week: parseInt(yahooLeague.current_week),
        end_week: parseInt(yahooLeague.end_week),
        is_finished: yahooLeague.is_finished,
        league_type: yahooLeague.league_type,
        logo_url: yahooLeague.logo_url
    };
};

const toLeagueEntityFromSleeper = (sleeperLeague) => {
    return {
        
    };
};

module.exports = {
    generateUserEntityPK,
    generateSessionEntitySK,
    generateLeagueEntitySK,
    toUserEntity,
    toLeagueEntityFromYahoo,
    toLeagueEntityFromSleeper,
    generateAccumulativeAwardSK,
};
