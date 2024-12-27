const config = require("config")
const jwt = require("jsonwebtoken")


class JwtService {
  constructor(author_accesKey, author_refreshKey, author_accesTime, author_refreshTime) {
    this.author_accesKey = author_accesKey;
    this.author_refreshKey = author_refreshKey;
    this.author_accesTime = author_accesTime;
    this.author_refreshTime = author_refreshTime;
  }
  generateTokens(payload) {
    const accesToken = jwt.sign(payload, this.author_accesKey, {
      expiresIn: this.author_accesTime,
    });
    const refreshToken = jwt.sign(payload, this.author_refreshKey, {
      expiresIn: this.author_refreshTime,
    });

    return {
      accesToken,
      refreshToken,
    };
  }
  async verifyAccesToken(token) {
    return jwt.verify(token, this.author_accesKey);
  }
  async verifyRefreshToken(token) {
    return jwt.verify(token, this.author_refreshKey);
  }
}

module.exports = new JwtService(
  config.get("author_accesKey"),
  config.get("author_refreshKey"),
  config.get("author_accesTime"),
  config.get("author_refreshTime")
);