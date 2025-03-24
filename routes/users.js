const router = require("express").Router();
const auth = require("../middlewares/auth");

const {
  // getUsers,
  // createUser,
  getCurrentUser,
  updateUser,
} = require("../controllers/users");
const { validateUserUpdate } = require("../middlewares/validation");

// router.get("/", getUsers);
// router.get("/:userId", getUserById);
router.use(auth);
router.get("/me", getCurrentUser);
router.patch("/me", validateUserUpdate, updateUser);

module.exports = router;
