const Joi = require("joi");

exports.author_socialValidation = (data) => {
    const author_socialSchema = Joi.object({
      author_id: Joi.string(),
      social_id: Joi.string(),
      social_link: Joi.string(),
    });
    return author_socialSchema.validate(data, { abortEarly: false })
};