const mongoose = require("mongoose");
const validator = require("validator");
const { user } = require("./user");

const clothingItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  weather: {
    type: String,
    required: true,
    enum: ["hot", "warm", "cold"],
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must eneter a valid URL",
    },
    owner: {
      type: ObjectId,
      required: true,
    },
    likes: {
      type: [ObjectId],
      ref: user,
    },
    createdAt: {
      type: Date,
      value: Date.now(),
    },
  },
});

module.export = mongoose.model("user", clothingItemSchema);
