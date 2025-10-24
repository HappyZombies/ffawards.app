const { StatusCodes } = require("http-status-codes");
const logger = require("pino").default();

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  logger.error({ err }, "An ApiError is going to be returned.");
  res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR);
  return res.json(err);
};
