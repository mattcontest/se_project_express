const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { unauthorizedError } = require("../utils/errors");
const UnauthorizedError = require("../errors/unauthorized-error");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer")) {
    // return res
    //   .status(unauthorizedError)
    //   .send({ message: `Authorization required ` });
    throw new UnauthorizedError("Authorization Required!");
  }
  const token = authorization.replace("Bearer ", "");
  // const payload = jwt.verify(token, JWT_SECRET);
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    // return res
    //   .status(unauthorizedError)
    //   .send({ message: "Authorization required test" });
    next(new UnauthorizedError("Authorization Required Test"));
  }

  req.user = payload;
  return next();
};
