const Joi = require("joi");
const currentYear = new Date().getFullYear();

// Define a schema for the expected cookies
const callbackSchema = Joi.object({
    code: Joi.string().min(1).max(255).required()
});

const leaguesBySeasonSchema = Joi.object({
    season: Joi.number().integer().min(2016).max(currentYear).required()
});

const leagueKeyPath = Joi.object({
    leagueKey: Joi.string().min(1).max(255).required()
});


  module.exports = {
    callbackSchema,
    leaguesBySeasonSchema,
    leagueKeyPath
  };
