const router = require("express").Router();
const auth = require("../middlewares/auth");

const {
  // getUsers,
  // createUser,
  getCurrentUser,
  updateUser,
} = require("../controllers/users");

// router.get("/", getUsers);
// router.get("/:userId", getUserById);
router.use(auth);
router.get("/me", getCurrentUser);
router.patch("/me", updateUser);

module.exports = router;
