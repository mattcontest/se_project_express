const router = require("express").Router();
const {
  getItems,
  createItem,
  deleteItem,
} = require("../controllers/clothingItems");

router.get("/", getItems);
router.post("/", createItem);
router.delete("/:itemId", deleteItem);
router.put("/items/:itemId/likes", () => console.log("Like an item"));
router.delete("/items/:itemId/likes", () => console.log("Unlike an item"));

module.exports = router;
