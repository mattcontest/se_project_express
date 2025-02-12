const ClothingItem = require("../models/clothingItem");

//GET /items

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => {
      res.send(items);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send({ message: err.message });
    });
};

const getItemById = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => res.send(item))
    .catch((err) => {
      console.error(err);
      return res.status(500).send({ message: err.message });
    });
};

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  console.log("Req.body", name, weather, imageUrl);
  ClothingItem.create({ name, weather, imageUrl })
    // .orFail()
    .then((item) => {
      res.send(item);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: err.message });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.deleteOne({ _id: itemId })
    .then((items) => {
      if (items.deletedCount === 0) {
        return res.status(404).send({ message: "Item Not Found" });
      }
      res.send({ message: `Item ${itemId} deleted succesfully!` });
    })
    // .orFail()
    .catch((err) => {
      return res.status(500).send({ message: err.message });
    });
};

module.exports = { getItems, createItem, deleteItem };
