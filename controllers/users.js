const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = require("../utils/config");
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
  const { name, avatar, email, password } = req.body;
  console.log("Req.body", name, avatar);
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) => {
      res.status(201).send({
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        _id: user._id,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return res.status(409).send({ message: "Email already used" });
      } else if (err.name === "ValidationError") {
        return res
          .status(badRequest)
          .send({ message: "400 Bad Request when creating a user" });
      }

      return res
        .status(serverError)
        .send({ message: "500 Server Error when creating a user" });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.status(200).send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: "Authentication Failed" });
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

module.exports = { getUsers, createUser, getUserById, login };
