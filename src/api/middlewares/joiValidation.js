const Joi = require("joi");
const ApiError = require("../../errors/ApiError");
const { setupLoggerWrapper } = require("../../services/LoggerService");

const joiValidation = (schema, type = "body") => (req, res, next) => {
    const logger = setupLoggerWrapper(req.tid, "joiValidation", { __filename });
    const { error } = Joi.compile(schema).validate(req[type]);

    if (error) {
        const errorMessage = error.details
        .map((details) => details.message)
        .join(", ");
        logger.debug({ error }, "Joi validation failed.");
        return next(new ApiError(errorMessage, req.tid, error, 400));
    }
    
    return next();
};

module.exports = joiValidation;
