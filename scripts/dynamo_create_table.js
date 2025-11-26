// creates dynamo dev table
const { DynamoDBClient, CreateTableCommand } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({ region: "us-east-1", endpoint: "http://localhost:8000" });

const createTable = async () => {
  const command = new CreateTableCommand({
    TableName: "ffawards",
    KeySchema: [
      { AttributeName: "PK", KeyType: "HASH" },  // Partition key
      { AttributeName: "SK", KeyType: "RANGE" },  // Sort key
    ],
    AttributeDefinitions: [
      { AttributeName: "PK", AttributeType: "S" },  // String type for PK
      { AttributeName: "SK", AttributeType: "S" },  // String type for SK
      { AttributeName: "session_token", AttributeType: "S" },  // String type for GSI
      { AttributeName: "share_id", AttributeType: "S" },  // String type for GSI
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
    GlobalSecondaryIndexes: [
      {
        IndexName: "GSI_SessionToken",  // Name of the GSI
        KeySchema: [
          { AttributeName: "session_token", KeyType: "HASH" }  // Partition key for GSI
        ],
        Projection: {
          ProjectionType: "ALL"  // Project all attributes
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5,
        }
      },
      {
        IndexName: "GSI_ShareId",  // Name of the GSI
        KeySchema: [
          { AttributeName: "share_id", KeyType: "HASH" }  // Partition key
        ],
        Projection: {
          ProjectionType: "ALL"  // Project all attributes
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5,
        }
      }
    ],
  });

  try {
    const response = await client.send(command);
    console.log("Table created:", response);
  } catch (error) {
    console.error("Error creating table:", error);
  }
};

createTable();
