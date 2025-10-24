const { Router } = require("express");

const { version } = require("../../../../package.json");
const route = Router();

module.exports = app => {

    app.use("/", route);

    route.get("/about", async (req, res) => {
        return res.json({ version });
    });
};
