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
      return res
        .status(serverError)
        .send({ message: "An error has occurred while retrieving Items" });
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
  // console.log("Req.body", name, weather, imageUrl);
  // console.log("Is that the Id", req.user.owner);
  // Grabbing the owner/_id from the app.js as instructed and adding this way

  // since I cannot destructure it from req.body but I have to grab it from req.user

  // const { owner } = req.user;
  const owner = req.user._id;
  console.log("Check owner", owner);
  ClothingItem.create({ name, weather, imageUrl, owner })
    // .orFail()

    .then((item) => {
      item.populate("owner");
      res.send({ data: item });
      // res.json(item);
    })
    .then((populatedItem) => {
      res.status(201).json(populatedItem);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(badRequest)
          .send({ message: "400 Bad Request when creating Item" });
      }
      return res
        .status(serverError)
        .send({ message: "500 Server Error when creating Item" });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  const loggedUser = req.user._id;

  ClothingItem.findById(itemId)
    .orFail(() => {
      throw new NotFoundError("Item not found");
    })
    .then((item) => {
      //now checking if the item owner corresponds to the loggedUser who's making the request
      console.log("Check item owner", String(item.owner));
      console.log("Check logged user", loggedUser);

      if (String(item.owner) !== loggedUser) {
        // throw new AssertionError(
        //   "You do not have the permission to delete this item"
        // );
        return res.status(403).send({ message: "Assertion Error" });
      }

      return ClothingItem.findByIdAndDelete(itemId).then(() =>
        res.status(200).send({ message: "Item deleted!" })
      );
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(badRequest)
          .send({ message: "400 Bad Request when deleting an item" });
      }

      // if (err.name === "AssertionError") {
      //   return res.status(403).send({ message: "Assertion Error" });
      // }

      return res
        .status(notFound)
        .send({ message: "404 user id Not found - Cannot delete Item" });
    });

  // ClothingItem.findByIdAndDelete({ _id: itemId })
  //   .then((deletedItem) => {
  //     if (!deletedItem) {
  //       return res
  //         .status(notFound)
  //         .send({ message: "Requested resource not found" });
  //     }
  //     return res
  //       .status(200)
  //       .json({ message: `Item ${itemId} deleted succesfully!` });
  //   })
  //   // .orFail()
  //   .catch((err) => {
  //     if (err.name === "CastError") {
  //       return res
  //         .status(badRequest)
  //         .send({ message: "400 Bad Request when deleting an  Item" });
  //     }
  //     return res
  //       .status(serverError)
  //       .send({ message: "500 Server Error when deleting an  Item" });
  //   });
};

const likeItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
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
      if (err.name === "CastError") {
        return res
          .status(badRequest)
          .send({ message: "CastError when attempting to like an item" });
      }
      return res
        .status(serverError)
        .send({ message: "500 Server Error when attemping to like an item" });
    });
};

const dislikeItem = (req, res) => {
  const { itemId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res
      .status(badRequest)
      .send({ message: "Bad Request: Invalid Format!" });
  }

  return ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
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
      if (err.name === "CastError") {
        return res
          .status(badRequest)
          .send({ message: "Bad Request: Cast Error when disliking an item" });
      }
      return res
        .status(serverError)
        .send({ message: "500 Server Error when deleting an  Item" });
    });
};

module.exports = { getItems, createItem, deleteItem, likeItem, dislikeItem };
