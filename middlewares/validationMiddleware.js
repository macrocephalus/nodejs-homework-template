const joi = require("joi");
const Joi = require("joi");
const { createError } = require("../helpers");

module.exports = {
  addPostValidation: (req, res, next) => {
    const contactAddSchema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email({ tlds: { allow: false } }),
      phone: Joi.string().required(),
    });

    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw createError(400, "missing required name field");
    }

    next();
  },

  updateValidation: (req, res, next) => {
    const contactUpdateSchema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email({ tlds: { allow: false } }),
      phone: Joi.string().required(),
    });

    const { error } = contactUpdateSchema.validate(req.body);
    if (error) {
      throw createError(400, "missing fields");
    }
    next();
  },
};
