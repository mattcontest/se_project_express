const { rateLimit } = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, //15min
  limit: 100, //Limit each IP to up to 100 request per window,
  standardHeaders: "draft-h",
  legacyHeaders: false,
});

module.exports = { limiter };
