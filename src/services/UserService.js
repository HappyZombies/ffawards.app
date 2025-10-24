const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { UpdateCommand, DynamoDBDocumentClient, QueryCommand, PutCommand, DeleteCommand } = require("@aws-sdk/lib-dynamodb");

const { ApplicationError } = require("../errors");
const { setupLoggerWrapper } = require("./LoggerService");
const { generateUserEntityPK, toUserEntity } = require("../utils/dynamoEntities");
const { dynamoConfig } = require("../utils");

class UserService {
    constructor() {
        const client = new DynamoDBClient(dynamoConfig);
        this.dynamoDocClient = DynamoDBDocumentClient.from(client);
    }

    async getUserAccount(tid, username, provider, providerAccountId) {
        const logger = setupLoggerWrapper(tid, "getUserAccount", { __filename });
        const PKUSER = generateUserEntityPK(username, provider, providerAccountId);
        const command = new QueryCommand({
            TableName: "ffawards",
            KeyConditionExpression: "PK = :pk AND SK = :sk",
            ExpressionAttributeValues: {
              ":pk": PKUSER,
              ":sk": PKUSER,
            },
            Limit: 1
          });
        let result;
        try {
            result = await this.dynamoDocClient.send(command);
        } catch (err) {
            logger.error({ err }, "Failed to query dynamo user.");
            throw new ApplicationError("Failed to get user.", tid, err);
        }
        logger.debug({ result }, "Dynamo Query result.");
        if(result.Items.length === 0) {
            return null;
        }
        return toUserEntity(result.Items[0]);
    }

    async getUserAccountByPK(tid, PKUSER) {
        const logger = setupLoggerWrapper(tid, "getUserAccountByPK", { __filename });
        const command = new QueryCommand({
            TableName: "ffawards",
            KeyConditionExpression: "PK = :pk AND SK = :sk",
            ExpressionAttributeValues: {
              ":pk": PKUSER,
              ":sk": PKUSER,
            },
            Limit: 1
          });
        let result;
        try {
            result = await this.dynamoDocClient.send(command);
        } catch (err) {
            logger.error({ err }, "Failed to query dynamo for user.");
            throw new ApplicationError("Failed to get user.", tid, err);
        }
        logger.debug({ result }, "Dynamo Query result.");
        if(result.Items.length === 0) {
            return null;
        }
        return toUserEntity(result.Items[0]);
    }

    async createUserAccount(tid, username, provider, providerAccountId, tokenExpiry) {
        const logger = setupLoggerWrapper(tid, "createUserAccount", { __filename });
        const PKUSER = generateUserEntityPK(username, provider, providerAccountId);
        const token_expiry = new Date(Date.now() + tokenExpiry * 1000).toISOString();
        const newUserItem = {
            PK: PKUSER,
            SK: PKUSER,
            entity_type: "user",
            provider_user_id: providerAccountId,
            provider,
            token_expiry,
            username,
            created_at: new Date().toISOString(),
            update_at: new Date().toISOString(),
        };
        const command = new PutCommand({
            TableName: "ffawards",
            Item: newUserItem
        });

        try {
            await this.dynamoDocClient.send(command);
        } catch (err) {
            logger.error({ err }, "Failed to create user account.");
            throw new ApplicationError("Failed to create user by e-mail.", tid, err);
        }
        logger.debug("User account created successfully.");
        return toUserEntity(newUserItem);
    }

    async updateUserAccount(tid, username, provider, providerAccountId, tokenExpiry) {
        const logger = setupLoggerWrapper(tid, "updateUserAccount", { __filename });
        const PKUSER = generateUserEntityPK(username, provider, providerAccountId);
        const token_expiry = new Date(Date.now() + tokenExpiry * 1000).toISOString();
        const command = new UpdateCommand({
          TableName: "ffawards",
          Key: {
            PK: PKUSER,
            SK: PKUSER,
          },
          UpdateExpression: "set token_expiry = :token_expiry, updated_at = :updated_at",
          ExpressionAttributeValues: {
            ":token_expiry": token_expiry,
            ":updated_at": new Date().toISOString(),
          },
          ReturnValues: "ALL_NEW"
        });
      
        let result;
        try {
            result = await this.dynamoDocClient.send(command);
        } catch (err) {
            logger.error({ err }, "Failed to update dynamo for user.");
            throw new ApplicationError("Failed to update user.", tid, err);
        }
        logger.debug({ result }, "Dynamo Query result.");
        return toUserEntity(result.Attributes);
    }

    async updateUserAccountByPK(tid, userPK, tokenExpiry) {
        const logger = setupLoggerWrapper(tid, "updateUserAccountByPK", { __filename });
        const token_expiry = new Date(Date.now() + tokenExpiry * 1000).toISOString();
        const command = new UpdateCommand({
          TableName: "ffawards",
          Key: {
            PK: userPK,
            SK: userPK,
          },
          UpdateExpression: "set token_expiry = :token_expiry, updated_at = :updated_at",
          ExpressionAttributeValues: {
            ":token_expiry": token_expiry,
            ":updated_at": new Date().toISOString(),
          },
          ReturnValues: "ALL_NEW"
        });
      
        let result;
        try {
            result = await this.dynamoDocClient.send(command);
        } catch (err) {
            logger.error({ err }, "Failed to update dynamo for user by their PK.");
            throw new ApplicationError("Failed to update user.", tid, err);
        }
        logger.debug({ result }, "Dynamo Query result.");
        return toUserEntity(result.Attributes);
    }

      // TODO: Finish implementing -- need to first query everything and delete by the PK and SK we get back.
    async deleteUserAccount(tid, userId) {
        const command = new DeleteCommand({
            TableName: "ffawards",
            ConditionExpression: "PK = :PK AND SK = :SK",
            ExpressionAttributeValues: {
                ":PK": userId,
                ":SK": userId,
            }
        });
        await this.dynamoDocClient.send(command);
    }

}

module.exports = new UserService();
