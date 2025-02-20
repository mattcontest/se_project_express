const { JWT_SECRET } = require("../utils/config");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const { autorizhation } = req.headers;
  if (!autorizhation || !autorizhation.startsWith("Bearer")) {
    return res.status(401).send({ message: `Authorization required` });
  }
  const token = autorizhation.replace("Bearer", "");
  // const payload = jwt.verify(token, JWT_SECRET);
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(401).send({ message: "Authorization required" });
  }

  req.user = payload;
  next();
};
