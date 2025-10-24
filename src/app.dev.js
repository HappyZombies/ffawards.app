/**
 * The app.dev.js file is the entry point for the application when running in development mode.
 * 
 * In local development, we spin up an https server to serve the application.
 */
const { randomUUID } = require("crypto");
const fs = require("fs");
const https = require("https");
const express = require("express");

process.env.APP_TRACKING_ID = randomUUID();

const { logger } = require("./services/LoggerService");
const loaders = require("./loaders");

const { WEBSERVER_PORT } = process.env;

const generateSSL = () => {
    return {
        key: fs.readFileSync("./src/server.key"),
        cert: fs.readFileSync("./src/server.crt")
    };
};

const startServer = async () => {
  logger.debug("Starting ffawards local dev server.");
  const app = express();
  await loaders(app);
  https.createServer(generateSSL(), app).listen(WEBSERVER_PORT, () => {
        logger.info(`FFAwards is running! https://localhost:${WEBSERVER_PORT}`);
    });
};

startServer();
