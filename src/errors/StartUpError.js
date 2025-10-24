class StartUpError extends Error {
    constructor(message, traceId, originalError) {
      super(message);
      this.name = this.constructor.name;
      this.originalError = originalError;
      this.date = new Date();
    }
  }

module.exports = StartUpError;
