const router = require("express").Router();
const { notFound } = require("../utils/errors");

const userRouter = require("./users");
const itemRouter = require("./clothingItems");
const { login } = require("../controllers/users");

router.use("/users", userRouter);
router.use("/items", itemRouter);
router.post("/signin", login);
router.use((req, res) => {
  res.status(notFound).send({ message: "Resource Not Found 404." });
});

module.exports = router;
