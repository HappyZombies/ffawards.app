const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { QueryCommand, DynamoDBDocumentClient, BatchWriteCommand } = require("@aws-sdk/lib-dynamodb");

const { ApiError } = require("../errors");
const LeagueDataService = require("./LeagueDataService");
const { setupLoggerWrapper } = require("../services/LoggerService");
const { AllMostPointsAwards, MostTDAward, TotalPointsAward, TotalBenchPointsAward, AveragePointsAward, InterceptionAward, FumbleAward, ZeroPointsAward, MostActiveManager } = require("../awards");
const { generateLeagueEntitySK, generateAccumulativeAwardSK } = require("../utils/dynamoEntities");
const { dynamoConfig } = require("../utils");

class AwardsService {
    constructor() {
        const client = new DynamoDBClient(dynamoConfig);
        this.dynamoDocClient = DynamoDBDocumentClient.from(client, {
            marshallOptions: { removeUndefinedValues: true }
        });
    }

    async retrieveLeagueAwards(tid, provider, leagueKey) {
        const logger = setupLoggerWrapper({ trackingId: tid }, "retrieveLeagueAwards", { __filename });
        let result;
        const PK = generateLeagueEntitySK(provider, leagueKey);
        logger.trace({ PK }, "PK to use for this query");
        try {
            const command = new QueryCommand({
                TableName: "ffawards",
                KeyConditionExpression: "PK = :pk AND begins_with(SK, :sk)",
                ExpressionAttributeValues: {
                    ":pk": PK,
                    ":sk": "AWARD#TYPE#ACCUMULATIVE"
                }
            });
            result = await this.dynamoDocClient.send(command);
        } catch (err) {
            logger.error({ err }, "Failed to query leagues by user ID and season.");
            throw new ApiError("Failed to get leagues by user ID and season.", tid);
        }
        const awards = result.Items;
        logger.debug({ leagueCount: awards.length }, "League awards retrieved successfully.");
        const sortedAwards = awards.sort((a, b) => a.display_order - b.display_order);
        return sortedAwards;
    }

    async generateDefaultLeagueAwards(tid, provider, leagueKey, userId) {
        const logger = setupLoggerWrapper(tid, "generateDefaultLeagueAwards", { __filename });
        try {
            const apiResult = await LeagueDataService.gatherData(tid, provider, leagueKey);
            const defaultAwards = [
                ...AllMostPointsAwards.map(award => award.setDataSet(apiResult).setProvider(provider).setLeagueId(leagueKey).build()),
                MostTDAward.setDataSet(apiResult).setProvider(provider).setLeagueId(leagueKey).build(),
                TotalPointsAward.setDataSet(apiResult).setProvider(provider).setLeagueId(leagueKey).build(),
                TotalBenchPointsAward.setDataSet(apiResult).setProvider(provider).setLeagueId(leagueKey).build(),
                AveragePointsAward.setDataSet(apiResult).setProvider(provider).setLeagueId(leagueKey).build(),
                InterceptionAward.setDataSet(apiResult).setProvider(provider).setLeagueId(leagueKey).build(),
                FumbleAward.setDataSet(apiResult).setProvider(provider).setLeagueId(leagueKey).build(),
                ZeroPointsAward.setDataSet(apiResult).setProvider(provider).setLeagueId(leagueKey).build(),
                MostActiveManager.setDataSet(apiResult).setProvider(provider).setLeagueId(leagueKey).build(),
            ];
            const leagueAwards = [];
            const leagueAwardsPutRequests = [];
            const PK = generateLeagueEntitySK(provider, leagueKey);
            for (let i = 0; i < defaultAwards.length; i++) {
                const defaultAward = defaultAwards[i];
                const { award_data, award_data_weekly, player_data, variants } = await defaultAward.calculateAward(tid);
                if (!award_data) {
                    // skipping as no data was returned for either weekly or total, no point in storing this.
                    continue;
                }
                leagueAwardsPutRequests.push({
                    PutRequest: {
                        Item: {
                            PK,
                            SK: generateAccumulativeAwardSK(defaultAward.id),
                            entity_type: "award",
                            created_at: new Date().toISOString(),
                            name: defaultAward.name,
                            description: defaultAward.description,
                            award_data,
                            award_data_weekly,
                            player_data,
                            variants,
                            display_order: defaultAward.displayOrder
                        }
                    }
                });
            }
            // Perform batch write
            const params = {
                RequestItems: {
                    "ffawards": leagueAwardsPutRequests
                }
            };
            logger.info({ msg: "Generating default awards", params });
            await this.dynamoDocClient.send(new BatchWriteCommand(params));

            logger.info({ msg: "Default awards generated", leagueKey, userId, leagueAwards });
        } catch (err) {
            logger.error({ msg: "Error generating default awards", err, leagueKey, userId });
            if (err instanceof ApiError) {
                throw err;
            }
            throw new ApiError("Could not generate default awards", tid, err);
        }
    }
}

module.exports = new AwardsService();
