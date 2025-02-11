const router = require("express").Router();
const { getUsers } = require("../controllers/users");

router.get("/", getUsers);
router.get("/:userId", () => console.log("Get users by ID"));
router.post("/", () => console.log("Post Users"));

module.exports = router;
