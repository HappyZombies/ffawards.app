const { randomUUID } = require("crypto");

module.exports = (req, res, next) => {
    req.tid = randomUUID();
    return next();
};
