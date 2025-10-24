const { Router } = require("express");

const apiv1 = require("./v1");

const app = Router();

// this serves as the root path definition, define root paths here
app.use("/api", apiv1);

module.exports = app;
