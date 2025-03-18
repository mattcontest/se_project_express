const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateClothingItem = celebrate({
  body: Joi.object().keys({
    title: Joi.string().required().min(2).max(30),
    imageUrl: Joi.string().required().uri(),
  }),
});

const validateUserBody = celebrate({
  body: Joi.object().keys({
    username: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().uri(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateUserandClothingId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
    itemId: Joi.string().alphanum().length(24),
  }),
});

module.exports = {
  validateClothingItem,
  validateUserBody,
  validateLogin,
  validateUserandClothingId,
};
