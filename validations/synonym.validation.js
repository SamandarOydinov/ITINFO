const Joi = require("joi");

exports.synonymValidation = (data) => {
  const synonymSchema = Joi.object({
    desc_id: Joi.number()
      .integer()
      .message("desc_idga faqat number kiritishingiz kerak!"),
    dict_id: Joi.number()
      .integer()
      .message("dict_idga faqat number kiritishingiz kerak!"),
  });
  return synonymSchema.validate(data, { abortEarly: false });
};
