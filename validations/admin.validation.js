const Joi = require("joi");

exports.adminValidation = (data) => {
  const adminSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
    password: Joi.string(),
    is_active: Joi.boolean(),
    is_creator: Joi.boolean(),
  });
  return adminSchema.validate(data, { abortEarly: false })
};