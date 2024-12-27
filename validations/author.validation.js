const Joi = require("joi");

exports.authorValidation = (data) => {
  const authorSchema = Joi.object({
    first_name: Joi.string()
      .min(4)
      .message("ism kamida 4 ta harf bo'lishi kerak!")
      .max(40)
      .message("ism ko'pi bilan 40 ta harf bo'lishi kerak!"),
    last_name: Joi.string()
      .min(4)
      .message("familiya kamida 4 ta harf bo'lishi kerak!")
      .max(40)
      .message("familiya ko'pi bilan 40 ta harf bo'lishi kerak!"),
    nick_name: Joi.string()
      .min(4)
      .message("nickname kamida 4 ta harf bo'lishi kerak!")
      .max(40)
      .message("nickname ko'pi bilan 40 ta harf bo'lishi kerak!"),
    email: Joi.string()
      .email()
      .message("abcd1234@gmail.com")
      .min(4)
      .message("email kamida 4 ta harf bo'lishi kerak!")
      .max(40)
      .message("email ko'pi bilan 40 ta harf bo'lishi kerak!"),
    phone: Joi.string(),
    password: Joi.string()
      .min(4)
      .message("password kamida 4 ta harf bo'lishi kerak!")
      .max(10)
      .message("ism ko'pi bilan 10 ta harf bo'lishi kerak!"),
    info: Joi.string()
      .max(500)
      .message("Info ko'pi bilan 500 ta belgi bo'lishi kerak!"),
    position: Joi.string(),
  });
  return authorSchema.validate(data, { abortEarly: false });
};
