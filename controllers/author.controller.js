const { errorHandler } = require("../helpers/error_Handler");
const Author = require("../schemas/Author");
const bcrypt = require("bcrypt");
const { authorValidation } = require("../validations/author.validation");
const jwt = require("jsonwebtoken");
const config = require("config");
const authorJwt = require("../services/author_service");
const { to } = require("../helpers/to_promise");
const MailService = require("../services/mail.service");
const uuid = require("uuid");
const mailService = require("../services/mail.service");

const getAllAuthor = async (req, res) => {
  try {
    const data = await Author.find({});
    console.log(data);
    res.status(200).send({ data });
  } catch (error) {
    errorHandler(error, res);
  }
};

const loginAuthor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const author = await Author.findOne({ email });
    if (!author) {
      return res.status(401).send({ message: "Email yoki parol noto'g'ri" });
    }

    const validPassword = bcrypt.compareSync(password, author.password);
    if (!validPassword) {
      return res.status(401).send({ message: "Email yoki parol noto'g'ri1" });
    }

    const payload = {
      id: author._id,
      email: email,
      is_active: author.is_active,
    };

    const tokens = authorJwt.generateTokens(payload);

    author.refresh_token = tokens.refreshToken;
    await author.save();
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("author_refresh_token_ms"),
    });

    // const token = jwt.sign(payload, config.get("tokenKey"), {
    //   expiresIn: config.get("tokenTime"),
    // })

    // try {
    //   setTimeout(function(){
    //     const err = new Error("unCaughtExceptionError")
    //     throw err

    //   }, 5000);
    // } catch (error) {
    //   console.log(error);
    // }

    // new Promise ((_, reject) => {
    //   reject(new Error("unhandledRejection example"));
    // })

    res
      .status(200)
      .send({
        message: "Tizimga XUSH KELIBSIZ!",
        author_id: author._id,
        accesToken: tokens.accesToken,
      });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAuthorById = async (req, res) => {
  try {
    const id = req.params.id;

    const author = await Author.findById(id);
    if (!author) {
      return res.status(400).send({ message: "Bunday author topilmadi! " });
    }
    res.status(200).send({ data: author });
  } catch (error) {
    errorHandler(error, res);
  }
};

const addAuthor = async (req, res) => {
  try {
    const { error, value } = authorValidation(req.body);
    if (error) {
    return res.status(400).send({ message: error.message });
    }

    const hashedPassword = bcrypt.hashSync(value.password, 7);

    const activation_link = uuid.v4()

    const newAuthor = await Author.create({
      ...value,
      password: hashedPassword,
      activation_link,
    });

    // await mailService.sendMailActivationCode(
    //   value.email,
    //   `${config.get("api_url")}/api/author/activate/${activation_link}`
    // );

    res.status(201).send({
      message: "New author added",
      data: newAuthor,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateAuthorById = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      first_name,
      last_name,
      nick_name,
      email,
      phone,
      password,
      info,
      position,
      photo,
      is_expert,
      is_active,
    } = req.body;

    const updatedAuthor = await Author.updateOne(
      { _id: id },
      {
        first_name,
        last_name,
        nick_name,
        email,
        phone,
        password,
        info,
        position,
        photo,
        is_expert,
        is_active,
      }
    );

    res.status(201).send({
      message: "Author updated",
      updatedAuthor,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteAuthorById = (req, res) => {
  try {
    const id = req.params.id;
    const deletedAuthor = Author.deleteOne({ _id: id });

    res.status(200).send({ data: deletedAuthor });
  } catch (error) {
    errorHandler(error, res);
  }
};

const logoutAuthor = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(400).send({ message: "Token topilmadi!" });
    }
    const author = await Author.findOneAndUpdate(
      { refresh_token: refreshToken },
      { refresh_token: "" },
      { new: true }
    );
    if (!author) {
      return res
        .status(400)
        .send({ message: " bunday tokenli foydalanuvchi yo'q ! " });
    }
    res.clearCookie("refreshToken");
    res
      .status(200)
      .send({ message: "Succesfully", refreshToken: author.refresh_token });
  } catch (error) {
    console.log(error.message);
  }
};

const refreshAuthorToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
     
    if (!refreshToken) {
      return res.status(400).send({ message: "Cookieda Token topilmadi!" });
    }

    console.log(refreshToken);
    

    const [error, tokenFromCookie] = await to(
      authorJwt.verifyRefreshToken(refreshToken)
    );
    if (error) {
      return res
        .status(401)
        .send({ message: "Error verify refreshToken", error: error.message });
    }
    const author = await Author.findOne({ refresh_token: refreshToken });
    if (!author) {
      return res.status(404).send({ message: "Author not found!" });
    }

    const payload = {
      id: author._id,
      email: author.email,
      is_active: author.is_active,
    };

    const tokens = authorJwt.generateTokens(payload);

    author.refresh_token = tokens.refreshToken;
    await author.save();
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("author_refresh_token_ms"),
    });

    res.status(200).send({
      message: "Tizimga xush kelibsiz",
      accesToken: tokens.accesToken,
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getAllAuthor,
  getAuthorById,
  addAuthor,
  updateAuthorById,
  deleteAuthorById,
  loginAuthor,
  logoutAuthor,
  refreshAuthorToken,
};
