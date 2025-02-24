const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer")) {
    return res.status(401).send({ message: `Authorization required ` });
  }
  const token = authorization.replace("Bearer ", "");
  // const payload = jwt.verify(token, JWT_SECRET);
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(401).send({ message: "Authorization required test" });
  }

  req.user = payload;
  return next();
};
