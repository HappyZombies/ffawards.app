const YahooService = require("../../services/YahooService");
const { ApiError } = require("../../errors");
const { setupLoggerWrapper } = require("../../services/LoggerService");

 
module.exports = async (req, res, next) => {
  const logger = setupLoggerWrapper(req.tid, "session_auth", { __filename });
  try {
    await YahooService.getLeague(req.params.leagueKey, req.tid);
  } catch(err) {
    logger.warn({ err, leagueKey: req.params.leagueKey }, "Could not verify this league from Yahoo.");
    return next(new ApiError("Failed to get league from Yahoo.", req.tid, err, 401));
  }
  return next();
};
