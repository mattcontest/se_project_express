const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateClothingItem = celebrate({
  body: Joi.object().keys({
    title: Joi.string().min(2).max(30).required(),
    imageUrl: Joi.string().url().required(),
  }),
});

const validateUserBody = celebrate({
  body: Joi.object().keys({
    username: Joi.string().min(2).max(30).required(),
    avatar: Joi.string().url().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const validateItemId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().hex().length(24).required().messages({
      "string.length": "Invalid item ID lenght",
      "string.hex": "Invalid item ID format",
      "any.required": "Item ID is required",
    }),
  }),
});

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const validateCardBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": "The minimum lenght of the 'name' field is 2",
      "string.max": "The maximum length of the 'name' field is 30",
      "string.empty": "The 'name' field must be filled in",
    }),

    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": "The 'imageUrl' filed must befilled in",
      "string.uri": "The 'imageUrl' filed must be a valid URL",
    }),
  }),
});

module.exports = {
  validateClothingItem,
  validateUserBody,
  validateLogin,
  validateItemId,
  validateCardBody,
};
