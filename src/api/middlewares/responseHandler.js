const YahooService = require("../../services/YahooService");

module.exports = () => {
    YahooService.yf.setUserToken("");
    YahooService.yf.setRefreshToken("");
};
