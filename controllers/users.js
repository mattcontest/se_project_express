const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const {
  badRequest,
  notFound,
  serverError,
  conflictError,
  unauthorizedError,
} = require("../utils/errors");

// const getUsers = (req, res) => {
//   User.find({})
//     .then((users) => {
//       res.send(users);
//     })
//     .catch((err) => {
//       console.error(err);
//       return res
//         .status(serverError)
//         .send({ message: "500 Server Error when attempting to getUsers" });
//     });
// };

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
        return res
          .status(conflictError)
          .send({ message: "Email already used" });
      }
      if (err.name === "ValidationError") {
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
  if (!email || !password) {
    return res
      .status(badRequest)
      .send({ message: "Both email and password fields are required!" });
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.status(200).send({ token });
    })
    .catch((err) => {
      if (err.message.includes("Incorrect email or password")) {
        return res
          .status(unauthorizedError)
          .send({ message: "Incorrect email or password ~ 401" });
      }

      return res.status(serverError).send({ message: "Authentication Failed" });
    });
};

const getCurrentUser = (req, res) => {
  const { _id: userId } = req.user;
  console.log(req.user);
  console.log("Req.params current user", userId);
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

const updateUser = (req, res) => {
  const { _id } = req.user;
  const { name, avatar } = req.body;
  User.findByIdAndUpdate(
    _id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => res.status(notFound).send({ message: `id not found` }))
    .then((user) => {
      res.status(200).send({
        _id: user._id,
        name: user.name,
        avatar: user.avatar,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.name === "Not Found") {
        return res.status(notFound).send({ message: "Not found" });
      }
      if (err.name === "ValidationError") {
        return res
          .status(badRequest)
          .send({ message: "400 Bad Request when updating user" });
      }
      return res.status(serverError).send({ message: "Server Error" });
    });
};

module.exports = { createUser, getCurrentUser, login, updateUser };
