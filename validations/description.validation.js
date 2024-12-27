const Joi = require("joi");

exports.descValidation = (data) => {
  const descSchema = Joi.object({
    category_id: Number,
    desc_name: Joi.string()
      .min(3)
      .message("nomi kamida 3 ta harf bo'lishi kerak!")
      .max(50)
      .message("nomi ko'pi bilan 50 ta bo'lishi kerak harflar!")
      .required()
      .messages({
        "string.empty": "desc nomi bo'sh bo'lmasligi kerak!",
        "any.required": "desc nomi kiritilishi shart!",
      }),
    parent_desc_id: Joi.string().alphanum().message("ID noto'g'ri!"),
  });
  return descSchema.validate(data, {
    abortEarly: false,
  });
};
