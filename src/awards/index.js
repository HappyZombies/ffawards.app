const MostPositionPointsAward = require("./MostPositionPointsAward");
const MostTDAward = require("./MostTDAward");
const TotalPointsAward = require("./TotalPointsAward");
const TotalBenchPointsAward = require("./TotalBenchPointsAward");
const AveragePointsAward = require("./AveragePointsAward");
const InterceptionAward = require("./InterceptionAward");
const FumbleAward = require("./FumbleAward");
const KickerMissedAward = require("./KickerMissedAward");
const ZeroPointsAward = require("./ZeroPointsAward");
const MostActiveManager = require("./MostActiveManager");

// TODO: Need to find a way to display these in a certain order, as for now it's alphabetical

const FirstAwards = {
    TotalPointsAward: new TotalPointsAward("True Total Points Award", 1)
};

const AllMostPointsAwards = {
    MostQBPointsAward: new MostPositionPointsAward("Best QB Points", "QB", 2),
    MostRBPointsAward: new MostPositionPointsAward("Best RB Points", "RB", 3),
    MostWRPointsAward: new MostPositionPointsAward("Best WR Points", "WR", 4),
    MostTEPointsAward: new MostPositionPointsAward("Best TE Points", "TE", 5),
    MostFlexPointsAward: new MostPositionPointsAward("Best Flex Points", "W/R/T", 6),
    MostKPointsAward: new MostPositionPointsAward("Best K Points", "K", 7),
    MostDEFPointsAward: new MostPositionPointsAward("Best DEF Points", "DEF", 8)
};

const OtherAwards = {
    TotalBenchPointsAward: new TotalBenchPointsAward("Bench Strength Award", 9),
    MostTDAward: new MostTDAward("Most TDs Scored", 0),
    AveragePointsAward: new AveragePointsAward("Average Points Award", 11),
    InterceptionAward: new InterceptionAward("Most Interception Award", 12),
    FumbleAward: new FumbleAward("Most Fumble Award", 13),
    ZeroPointsAward: new ZeroPointsAward("Most Zero Points Award", 14),
    MostActiveManager: new MostActiveManager("Most Active Manager Award", 15)
    // KickerMissedAward: new KickerMissedAward("Most Missed Kicks Award", 14) TODO: This will need some rework/hit another API.
};

module.exports = {
    // this array exists so it's easy to iterate over these awards in particular since they are all the same type
    AllMostPointsAwards: [
        ...Object.values(AllMostPointsAwards)
    ],
    ...FirstAwards,
    ...AllMostPointsAwards,
    ...OtherAwards
};
