/**
 * This is the entry point for the lambda function.
 * 
 * The lambda function is the entry point for the application when running in production mode.
 * 
 * @codegenie/serverless-express is a library that allows us to run an express app in AWS Lambda.
 */
const serverlessExpress = require("@codegenie/serverless-express");
const { randomUUID } = require("crypto");
const express = require("express");

process.env.APP_TRACKING_ID = randomUUID();

const loaders = require("./src/loaders");

let serverlessExpressInstance;

async function setup (event, context) {
    const app = express();
    await loaders(app);
    serverlessExpressInstance = serverlessExpress({ app });
    return serverlessExpressInstance(event, context);
}

function handler (event, context) {
  if (serverlessExpressInstance) return serverlessExpressInstance(event, context);

  return setup(event, context);
}

exports.handler = handler;
