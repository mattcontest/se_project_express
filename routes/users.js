const router = require("express").Router();
const {
  getUsers,
  createUser,
  getCurrentUser,
} = require("../controllers/users");

// router.get("/", getUsers);
// router.get("/:userId", getUserById);
router.get("/me", getCurrentUser);

module.exports = router;
