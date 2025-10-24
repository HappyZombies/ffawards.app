class ApplicationError extends Error {
    constructor(message, trackingId, originalError) {
      super(message);
      this.name = this.constructor.name;
      this.originalError = originalError;
      this.date = new Date();
      this.trackingId = trackingId;
    }
  }

module.exports = ApplicationError;
