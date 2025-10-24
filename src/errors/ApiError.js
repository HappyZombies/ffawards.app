class ApiError extends Error {
    constructor(message, trackingId, originalError, statusCode = 500) {
      super(message);
      this.name = this.constructor.name;
      this.trackingId = trackingId;
      this.originalError = originalError;
      this.statusCode = statusCode;
      this.date = new Date();
    }
    toJSON() {
      return {
          message: this.message,
          trackingId: this.trackingId,
          statusCode: this.statusCode,
          date: this.date
      };
  }
}

module.exports = ApiError;
