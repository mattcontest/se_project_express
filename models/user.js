const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: [true, "The avatar is required!"],
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  email: {
    type: String,
    required: [true, "The email is required"],
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: "You must use a valid email",
    },
  },
  password: {
    type: String,
    required: [true, "Password required"],
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email }).then((user) => {
    if (!user) {
      return Premise.reject(new Error("Incorrect email or password!"));
    }
    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        return Premise.reject(new Error("Incorrect email or password"));
      }
      return user;
    });
  });
};

module.exports = mongoose.model("User", userSchema);
