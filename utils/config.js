// const { JWT_SECRET = "dev-secret" } = "secret_sauce";
const { JWT_SECRET = "dev-secret" } = process.env;
module.exports = { JWT_SECRET };
