const router = require("express").Router();
const { getItems } = require("../controllers/clothingItems");

router.get("/", getItems);
router.post("/items", () => console.log("POST ITEMS"));
router.delete("/:itemId", () => console.log("DELETE ITEM"));
router.put("/items/:itemId/likes", () => console.log("Like an item"));
router.delete("/items/:itemId/likes", () => console.log("Unlike an item"));

module.exports = router;
