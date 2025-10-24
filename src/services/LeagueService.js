const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { QueryCommand, DeleteCommand, BatchWriteCommand, DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");

const { ApiError, ApplicationError } = require("../errors");
const { setupLoggerWrapper } = require("./LoggerService");
const YahooService = require("./YahooService");
const { generateLeagueEntitySK } = require("../utils/dynamoEntities");
const { dynamoConfig } = require("../utils");

class LeagueService {
    constructor() {
        const client = new DynamoDBClient(dynamoConfig);
        this.dynamoDocClient = DynamoDBDocumentClient.from(client);
    }

    
    async storeESPNLeague(tid, userPK, leagueData, provider) {
        // for the league id, just do a PUT, it will overwrite the existing league if it exists.
        const logger = setupLoggerWrapper(tid, "league", { __filename });
        try {
            if (leagueData) {
                logger.debug({ leagueData }, "Creating league in database for sleeper.");
                    // TODO/NOTE: Problem, the id doesn't change per season, so the SK needs to include the season as well. For now I won't do anything since we are only storing the current season anyways.
                    // It's not a problem today, but it will be in the future -- say in 2025 when we have multiple seasons, we will essentially replace the league data every year. But is this fine? I suppose people won't care about the previous season anymore unless they really do.
                    const SK = generateLeagueEntitySK(provider, leagueData.id);
                    const putRequests = [{
                        PutRequest: {
                            Item: {
                                PK: userPK,
                                SK,
                                entity_type: "league",
                                provider,
                                created_at: new Date().toISOString(),
                                end_week: 17, // assuming this
                                logo_url: null, // I think there's a logo but idk where it is
                                is_finished: false, // TODO: Probably need a way to calculate this
                                league_id: leagueData.id,
                                league_key: leagueData.id,
                                season: leagueData.seasonId,
                                name: leagueData.settings.name,
                                league_type: "public", // we know it's public now but that will change when we add private support
                                current_week: 0, // we don't really use it anyways since we just pull it from the API on request anyways when generating awards
                            }
                        }
                    }];
                // Perform batch write
                const params = {
                    RequestItems: {
                        "ffawards": putRequests
                    }
                };
    
                await this.dynamoDocClient.send(new BatchWriteCommand(params));
                return;
            }
        } catch (err) {
            logger.error({ err }, "Failed to create league(s).");
            throw new ApiError("Failed to create league(s).");
        }
        logger.warn("No leagues created for given user, since there weren't any.");
        // TODO: What should we do if there are no leagues?
        return;
    }

    async storeSleeperLeague(tid, userPK, leagueData, provider) {
        // for the league id, just do a PUT, it will overwrite the existing league if it exists.
        const logger = setupLoggerWrapper(tid, "league", { __filename });
        try {
            if (leagueData) {
                logger.debug({ leagueData }, "Creating league in database for sleeper.");
                    const SK = generateLeagueEntitySK(provider, leagueData.league_id);
                    const putRequests = [{
                        PutRequest: {
                            Item: {
                                PK: userPK,
                                SK,
                                entity_type: "league",
                                provider,
                                created_at: new Date().toISOString(),
                                end_week: 17, // assuming this
                                logo_url: leagueData.avatar,
                                is_finished: leagueData.status === "complete", // TODO: Check if pre_draft or draft earlier
                                league_id: leagueData.league_id,
                                league_key: leagueData.league_id,
                                season: leagueData.season,
                                name: leagueData.name,
                                league_type: "public", // assuming -- given that the API is public anyways...
                                current_week: 0, // assuming this -- we don't really use it anyways.
                            }
                        }
                    }];
                // Perform batch write
                const params = {
                    RequestItems: {
                        "ffawards": putRequests
                    }
                };
    
                await this.dynamoDocClient.send(new BatchWriteCommand(params));
                return;
            }
        } catch (err) {
            logger.error({ err }, "Failed to create league(s).");
            throw new ApiError("Failed to create league(s).");
        }
        logger.warn("No leagues created for given user, since there weren't any.");
        // TODO: What should we do if there are no leagues?
        return;
    }

    async storeCurrentAndPastLeagues(tid, userPK, provider) {
        const logger = setupLoggerWrapper(tid, "league", { __filename });
        // NOTE: Simply get the current year and the previous year's leagues, maybe this can be option later on?... but we will default to this for now.
        const currentYear = new Date().getFullYear();
        const previousYear = currentYear - 1;
        let leagueData;
        try {
            // TODO: Fix this to get the current year and previous year's leagues, or different? Maybe we can get the last 2 years?
            leagueData = await YahooService.getLeagues(tid, 2025, 0);
        } catch (err) {
            logger.error({ err, userPK }, "Failed to get leagues from Yahoo.");
            throw new ApplicationError("Failed to get leagues from Yahoo.");
        }
        try {
            if (leagueData?.length) {
                logger.debug({ leagueData }, "Creating league(s) in database.");
                const putRequests = leagueData.map(league => {
                    const SK = generateLeagueEntitySK(provider, league.league_key);
                    return {
                        PutRequest: {
                            Item: {
                                PK: userPK,
                                SK,
                                entity_type: "league",
                                provider,
                                created_at: new Date().toISOString(),
                                ...league // Spread existing league data
                            }
                        }
                    };
                });
                // Perform batch write
                const params = {
                    RequestItems: {
                        "ffawards": putRequests
                    }
                };
    
                await this.dynamoDocClient.send(new BatchWriteCommand(params));
                return;
            }
        } catch (err) {
            logger.error({ err }, "Failed to create league(s).");
            throw new ApiError("Failed to create league(s).");
        }
        logger.warn("No leagues created for given user, since there weren't any.");
        // TODO: What should we do if there are no leagues?
        return;
    }

    async getLeaguesByUserPKAndProvider(tid, userPK, provider) {
        const logger = setupLoggerWrapper({ trackingId: tid }, "league", { __filename });
        let result;
        try {
            const command = new QueryCommand({
                TableName: "ffawards",
                KeyConditionExpression: "PK = :pk AND begins_with(SK, :provider)",
                ExpressionAttributeValues: {
                    ":pk": userPK,
                    ":provider": `LEAGUE#${provider}`
                }
            });
            result = await this.dynamoDocClient.send(command);
        } catch (err) {
            logger.error({ err }, "Failed to query leagues by user ID and season.");
            throw new ApiError("Failed to get leagues by user ID and season.", tid);
        }
        logger.debug({ leagueCount: result.Items.length }, "Leagues retrieved successfully.");
        return result.Items;
    }


    async getUsersLeaguesBySeason(tid, userPK, provider, season) {
        const logger = setupLoggerWrapper({ trackingId: tid }, "league", { __filename });
        const leagues = await this.getLeaguesByUserPKAndProvider(tid, userPK, provider);
        // NOTE: filter by season, not that efficient since i am grabbing all leagues and then filtering, but it's fine for now.
        const filteredLeagues = leagues.filter(league => league.season === season);
        logger.debug({ leagueCountBySeason: filteredLeagues }, "Leagues retrieved successfully by season.");
        return filteredLeagues;
    }

    async getLeagueByLeagueKey(tid, userPK, provider, leagueKey) {
        const logger = setupLoggerWrapper({ trackingId: tid }, "league", { __filename });
        let result;
        const sk = generateLeagueEntitySK(provider, leagueKey);
        try {
            const command = new QueryCommand({
                TableName: "ffawards",
                KeyConditionExpression: "PK = :pk AND SK = :sk",
                ExpressionAttributeValues: {
                    ":pk": userPK,
                    ":sk": sk
                }
            });
            result = await this.dynamoDocClient.send(command);
        } catch (err) {
            logger.error({ err }, "Failed to query leagues by user ID and season.");
            throw new ApiError("Failed to get leagues by user ID and season.");
        }
        logger.debug({ leagueCount: result.Items.length }, "Leagues retrieved successfully.");
        if (!result.Items.length) {
            throw new ApiError("League not found.", tid);
        }
        return result.Items[0];
    }

    async deleteLeaguesByUserId(tid, userId) {
        const command = new DeleteCommand({
            TableName: "ffawards",
            ConditionExpression: "PK = :PK AND begins_with(SK, LEAGUE)",
            ExpressionAttributeValues: {
                ":PK": userId,
            }
        });
        await this.dynamoDocClient.send(command);
    }
}

module.exports = new LeagueService();
