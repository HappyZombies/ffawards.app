const ApiError = require("./ApiError");
const ApplicationError = require("./ApplicationError");
const StartUpError = require("./StartUpError");

const errorMessages = {
    INTERNAL_SERVER_ERROR: "Internal Server Error",
    UNAUTHORIZED_ERROR: "Unauthorized",
};


module.exports = {
    ApiError,
    ApplicationError,
    StartUpError,
    ...errorMessages
};
