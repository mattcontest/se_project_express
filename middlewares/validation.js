const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};
const validateClothingItem = celebrate({
  body: Joi.object().keys({
    title: Joi.string().min(2).max(30).required(),
    imageUrl: Joi.string().custom(validateURL).required(),
  }),
});

const validateAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'The "email" field must be a valid email',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

const validateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'The "imageUrl" field must be a valid url',
    }),
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be a filled in',
      "string.email": 'The "email" field must be a valid email',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
    }),
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
      "string.length": "Invalid item ID length",
      "string.hex": "Invalid item ID format",
      "any.required": "Item ID is required",
    }),
  }),
});
const validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required().messages({
      "string.hex": "Invalid User ID format",
      "string.length": "Invalid User ID length",
      "any.required": "User ID is required",
    }),
  }),
});
const validateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'The "imageUrl" field must be a valid url',
    }),
  }),
});

const validateCardBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": "The minimum length of the 'name' field is 2",
      "string.max": "The maximum length of the 'name' field is 30",
      "string.empty": "The 'name' field must be filled in",
    }),

    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": "The 'imageUrl' filed must befilled in",
      "string.uri": "The 'imageUrl' filed must be a valid URL",
    }),

    weather: Joi.string().required().valid("hot", "warm", "cold"),
  }),
});

module.exports = {
  validateClothingItem,
  validateUserBody,
  validateLogin,
  validateItemId,
  validateCardBody,
  validateUserId,
  validateAuthentication,
  validateUserUpdate,
};
