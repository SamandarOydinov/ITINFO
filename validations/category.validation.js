const Joi = require("joi");

exports.categoryValidation = (data) => {
  const categorySchema = Joi.object({
    category_name: Joi.string()
      .min(3)
      .message("nomi kamida 3 ta harf bo'lishi kerak!")
      .max(50)
      .message("nomi ko'pi bilan 50 ta bo'lishi kerak harflar!")
      .required()
      .messages({
        "string.empty": "category nomi bo'sh bo'lmasligi kerak!",
        "any.required": "category nomi kiritilishi shart!",
      }),
    parent_category_id: Joi.string().alphanum().message("ID noto'g'ri!"),
  });
  return categorySchema.validate(data, { abortEarly: false });
};
