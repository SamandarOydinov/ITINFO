const { to } = require("../helpers/to_promise");
const Jwt = require("../services/user_service");

module.exports = async function (req, res, next) {
  try {
    const authorization = req.headers.authorization;
    console.log("4", authorization);

    if (!authorization) {
      return res
        .status(403)
        .send({ message: "User ro'yxatdan o'tmagan(token topilmadi)!" });
    }

    const bearer = authorization.split(" ")[0];
    const token = authorization.split(" ")[1];

    if (bearer !== "Bearer" || !token) {
      return res
        .status(401)
        .send({ message: "User ro'yxatdan o'tmagan(token berilmagan)!" });
    }

    const [error, decodedToken] = await to(Jwt.verifyAccesToken(token));
    if (error) {
      return res.status(403).send({ message: error.message });
    }

    console.log("5", decodedToken);
    req.author = decodedToken;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).send({ message: error.message });
  }
};
