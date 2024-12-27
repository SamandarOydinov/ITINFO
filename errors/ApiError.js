
class ApiError extends Error {
  constructor(status, message) {
    super();
    this.status;
    this.message;
  }
  static badRequest(message) {
    return new ApiError(400, message);
  }
  static forbidden(message) {
    return new ApiError(403, message);
  }
  static unautorized(message) {
    return new ApiError(401, message);
  }
  static internal(message) {
    return new ApiError(500, message);
  }

}

module.exports = ApiError