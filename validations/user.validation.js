const Joi = require("joi");

exports.userValidation = (data) => {
  const userSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    password: Joi.string(),
    info: Joi.string(),
    photo: Joi.string(),
    is_active: Joi.boolean(),
  });
  return userSchema.validate(data, { abortEarly: false });
};
