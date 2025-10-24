const { randomUUID } = require("crypto");
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { QueryCommand, DeleteCommand, PutCommand, DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");
const UserService = require("./UserService");

const { ApplicationError } = require("../errors");
const { setupLoggerWrapper } = require("./LoggerService");
const { THIRTY_DAYS_MAX_AGE, dynamoConfig } = require("../utils");

class SessionService {
    constructor() {
        const client = new DynamoDBClient(dynamoConfig);
        this.dynamoDocClient = DynamoDBDocumentClient.from(client);
    }

    async getAccountSession(tid, sessionToken) {
        const command = new QueryCommand({
            TableName: "ffawards",
            IndexName: "GSI_SessionToken", // The GSI you created
            KeyConditionExpression: "session_token = :token",
            ExpressionAttributeValues: {
              ":token": sessionToken,
            },
          });
        
          const response = await this.dynamoDocClient.send(command);
          const session = response.Items[0];
          if (!session) {
            return null;
          }
          // we have a session, get the user now.
          const user = await UserService.getUserAccountByPK(tid, session.PK);
          return { ...user, sessionToken, expires_at: session.expires_at };
    }

    async createSession(tid, userPK) {
        const logger = setupLoggerWrapper(tid, "createSession", { __filename });
        const sessionToken = randomUUID();
        const expiresAt = new Date(Date.now() + THIRTY_DAYS_MAX_AGE).toISOString(); // Session expires in 30 days, sure.
    
        const command = new PutCommand({
            TableName: "ffawards",
            Item: {
                PK: userPK,
                SK: `SESSION#${sessionToken}`,
                entity_type: "session",
                session_token: sessionToken,
                expires_at: expiresAt,
            }
        });
    
        try {
            await this.dynamoDocClient.send(command);
        } catch (err) {
            logger.error({ err }, "Failed to create session.");
            throw new ApplicationError("Failed to create session.", tid, err);
        }
        return { session_token: sessionToken, expires_at: expiresAt };
    }

    async deleteSession(tid, userId, sessionToken) {
        const command = new DeleteCommand({
            TableName: "ffawards",
            Key: {
                PK: userId,
                SK: `SESSION#${sessionToken}`,
            }
        });
        await this.dynamoDocClient.send(command);
    }

    // TODO: The below is incorrect, we need to query all sessions by the PK and SK we get back.
    async deleteAllSessionByUserPK(tid, userId) {
        const command = new DeleteCommand({
            TableName: "ffawards",
            Key: {
                PK: userId
            },
        });
        await this.dynamoDocClient.send(command);
    }

}

module.exports = new SessionService();
