const { default: pino } = require("pino");
const { LOG_LEVEL, APP_TRACKING_ID } = process.env;

class LoggerService {
    constructor() {
        this.logger = pino({
            level: LOG_LEVEL,
            formatters: {
                bindings: () => {
                    return {
                        trackingId: APP_TRACKING_ID,
                        context: "application"
                    };
                }
            }
        });
    }

    setupLoggerWrapper(trackingId, context, extraProperties = {}) {
        return pino({
            level: LOG_LEVEL,
            formatters: {
                bindings: () => {
                    return {
                        trackingId,
                        context,
                        ...extraProperties
                    };
                }
            }
        });
    }
    
}

module.exports = new LoggerService();
