const router = require("express").Router();

router.get("/", () => console.log("Get ITEMS"));
router.post("/items", () => console.log("POST ITEMS"));
router.delete("/:itemId", () => console.log("DELETE ITEM"));

module.exports = router;
