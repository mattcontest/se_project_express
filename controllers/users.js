const User = require("../models/user");
const { badRequest, notFound, serverError } = require("../utils/errors");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      console.error(err);
      return res
        .status(serverError)
        .send({ message: "500 Server Error when attempting to getUsers" });
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;
  console.log("Req.body", name, avatar);

  User.create({ name, avatar })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(badRequest)
          .send({ message: "400 Bad Request  when creating an user" });
      }
      return res
        .status(serverError)
        .send({ message: "500 Server Error when creating an user" });
    });
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  console.log("Req.params", userId);
  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(notFound).send({ message: `${userId} not found` });
      }
      if (err.name === "CastError") {
        return res
          .status(badRequest)
          .send({ message: `Bad Request -- Cast Error when getUsersById` });
      }
      return res
        .status(serverError)
        .send({ message: "500 Server Error when attempting to getUserById" });
    });
};

module.exports = { getUsers, createUser, getUserById };
