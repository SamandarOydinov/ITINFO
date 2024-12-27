const config = require("config")
const jwt = require("jsonwebtoken")


class JwtService {
  constructor(user_accesKey, user_refreshKey, user_accesTime, user_refreshTime) {
    this.user_accesKey = user_accesKey;
    this.user_refreshKey = user_refreshKey;
    this.user_accesTime = user_accesTime;
    this.user_refreshTime = user_refreshTime;
  }
  generateTokens(payload) {
    const accesToken = jwt.sign(payload, this.user_accesKey, {
      expiresIn: this.user_accesTime,
    });
    const refreshToken = jwt.sign(payload, this.user_refreshKey, {
      expiresIn: this.user_refreshTime,
    });

    return {
      accesToken,
      refreshToken,
    };
  }
  async verifyAccesToken(token) {
    return jwt.verify(token, this.user_accesKey);
  }
  async verifyRefreshToken(token) {
    return jwt.verify(token, this.user_refreshKey);
  }
}

module.exports = new JwtService(
  config.get("user_accesKey"),
  config.get("user_refreshKey"),
  config.get("user_accesTime"),
  config.get("user_refreshTime")
);