const router = require("express").Router();
const { getUsers, createUser, getUserById } = require("../controllers/users");

// router.get("/", getUsers);
// router.get("/:userId", getUserById);
router.post("/:id", getUserById);

module.exports = router;
