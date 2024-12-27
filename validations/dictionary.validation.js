const Joi = require("joi");

exports.dictValidation = (data) => {
  const dictSchema = Joi.object({
    term: Joi.string()
      .max(500)
      .message("term ko'pi bilan 500 ta belgidan iborat bo'lishi kerak!")
      .required()
      .messages({
        "string.empty": "term bo'sh bo'lmasligi kerak!",
        "any.required": "term kiritilishi shart!",
      }),
  });
  return dictSchema.validate(data, { abortEarly: false });
};
