const { Router } = require("express");
const api = require("./api");
const auth = require("./auth");
const dashboard = require("./dashboard");

// any endpoints for api/{anything} will be here
const v1 = Router();
api(v1);
auth(v1);
dashboard(v1);

module.exports = v1;
