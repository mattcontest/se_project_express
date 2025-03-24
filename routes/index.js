const router = require("express").Router();
// const { notFound } = require("../utils/errors");

const userRouter = require("./users");
const itemRouter = require("./clothingItems");
const { login, createUser } = require("../controllers/users");
const {
  validateLogin,
  validateUserBody,
} = require("../middlewares/validation");
const NotFoundError = require("../errors/not-found-error");

router.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

router.post("/signin", validateLogin, login);
router.post("/signup", validateUserBody, createUser);
router.use("/items", itemRouter);
router.use("/users", userRouter);

router.use((req, res, next) => {
  // res.status(notFound).send({ message: "Resource Not Found 404." });
  next(new NotFoundError("Resource Not Found 404."));
});

module.exports = router;
