const { default: mongoose } = require("mongoose");
const ClothingItem = require("../models/clothingItem");
const { badRequest, notFound, serverError } = require("../utils/errors");

const getItems = (req, res) => {
  ClothingItem.find({})
    .populate("owner")
    .then((items) => {
      res.status(200).json(items);
    })
    .catch((err) => {
      console.error(err);
      return res.status(serverError).send({ message: err.message });
    });
};

// const getItemById = (req, res) => {
//   const { itemId } = req.params;
//   ClothingItem.findById(itemId)
//     .orFail()
//     .then((item) => res.send(item))
//     .catch((err) => {
//       console.error(err);
//       return res.status(500).send({ message: err.message });
//     });
// };

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  console.log("Req.body", name, weather, imageUrl);
  console.log("Is that the Id", req.user.owner);
  //Grabbing the owner/_id from the app.js as instructed and adding this way

  //since I cannot destructure it from req.body but I have to grab it from req.user

  const { owner } = req.user;
  console.log("Check owner", owner);
  ClothingItem.create({ name, weather, imageUrl, owner })
    // .orFail()

    .then((item) => item.populate("owner"))
    .then((populatedItem) => {
      res.status(201).json(populatedItem);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(badRequest).send({ message: err.message });
      }
      return res.status(serverError).send({ message: err.message });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndDelete({ _id: itemId })
    .then((deletedItem) => {
      if (!deletedItem) {
        return res
          .status(notFound)
          .send({ message: "Requested resource not found" });
      }
      return res
        .status(200)
        .json({ message: `Item ${itemId} deleted succesfully!` });
    })
    // .orFail()
    .catch((err) => {
      if (err.name === "AssertionError") {
        return res.status(badRequest).send({ message: err.message });
      }
      return res.status(badRequest).send({ message: err.message });
    });
};

const likeItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user.owner } },
    { new: true }
  )
    .populate("owner")
    .then((updatedItem) => {
      if (!updatedItem) {
        return res
          .status(notFound)
          .send({ message: "Requested resource not found" });
      }
      return res.status(200).json(updatedItem);
    })
    .catch((err) => {
      return res.status(badRequest).send({ message: err.message });
    });
};

const dislikeItem = (req, res) => {
  const { itemId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(400).send({ message: "Invalid Format!" });
  }

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user.owner } },
    { new: true }
  )
    .populate("owner")
    .then((updatedItem) => {
      if (!updatedItem) {
        return res
          .status(notFound)
          .send({ message: "Requested resource not found" });
      }

      return res.status(200).json(updatedItem);
    })
    .catch((err) => res.status(badRequest).send({ message: err.message }));
};

module.exports = { getItems, createItem, deleteItem, likeItem, dislikeItem };
