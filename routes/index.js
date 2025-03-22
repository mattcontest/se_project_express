const router = require("express").Router();
const { notFound } = require("../utils/errors");

const userRouter = require("./users");
const itemRouter = require("./clothingItems");
const { login, createUser } = require("../controllers/users");

router.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

router.post("/signin", login);
router.post("/signup", createUser);
router.use("/items", itemRouter);
router.use("/users", userRouter);

router.use((req, res) => {
  res.status(notFound).send({ message: "Resource Not Found 404." });
});

module.exports = router;
