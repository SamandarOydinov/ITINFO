const config = require("config")
const jwt = require("jsonwebtoken")


class JwtService {
  constructor(admin_accesKey, admin_refreshKey, admin_accesTime, admin_refreshTime) {
    this.admin_accesKey = admin_accesKey;
    this.admin_refreshKey = admin_refreshKey;
    this.admin_accesTime = admin_accesTime;
    this.admin_refreshTime = admin_refreshTime;
  }
  generateTokens(payload) {
    const accesToken = jwt.sign(payload, this.admin_accesKey, {
      expiresIn: this.admin_accesTime,
    });
    const refreshToken = jwt.sign(payload, this.admin_refreshKey, {
      expiresIn: this.admin_refreshTime,
    });

    return {
      accesToken,
      refreshToken,
    };
  }
  async verifyAccesToken(token) {
    return jwt.verify(token, this.admin_accesKey);
  }
  async verifyRefreshToken(token) {
    return jwt.verify(token, this.admin_refreshKey);
  }
}

module.exports = new JwtService(
  config.get("admin_accesKey"),
  config.get("admin_refreshKey"),
  config.get("admin_accesTime"),
  config.get("admin_refreshTime")
);