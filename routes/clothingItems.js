const router = require("express").Router();
const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
} = require("../controllers/clothingItems");

router.get("/", getItems);
router.post("/", createItem);
router.delete("/:itemId", deleteItem);
router.put("/:itemId/likes", likeItem);
router.delete("/items/:itemId/likes", () => console.log("Unlike an item"));

module.exports = router;
