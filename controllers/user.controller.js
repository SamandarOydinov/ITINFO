const { errorHandler } = require("../helpers/error_Handler");
const User = require("../schemas/User");
const userJwt = require("../services/user_service");
const { userValidation } = require("../validations/user.validation");
const bcrypt = require("bcrypt");
const config = require("config");
const uuid = require("uuid");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "Email yoki parol noto'g'ri!" });
    }
    console.log(password);
    console.log(user.password);

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(404).send({ message: "Email yoki parol noto'g'ri!" });
    }

    const payload = {
      id: user._id,
      name: user.name,
      email: email,
      is_active: user.is_active,
    };

    const tokens = userJwt.generateTokens(payload);
    user.refreshToken = tokens.refreshToken;
    await user.save();
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("user_refresh_token_ms"),
    });
    res.status(200).send({ message: "success", data: tokens})
  } catch (error) {
    errorHandler(error, res);
  }
};

const getUsers = async (req, res) => {
  try {
    const userlar = await User.find({});
    res.status(200).send({ data: userlar });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getUserById = (req, res) => {
  try {
    const id = req.params.id;
    const user = User.findOne({ id });
    if (!user) {
      return res.status(404).send({ message: "not found User!" });
    }
    res.status(200).send({ data: user });
  } catch (error) {
    errorHandler(error, res);
  }
};

const addUser = async (req, res) => {
  try {
    const { error, value } = userValidation(req.body);
    if (error) {
      return res.status(400).send({ message: error.message });
    }

    const hashedPassword = bcrypt.hashSync(value.password, 7);

    const activation_link = uuid.v4();

    const newUser = await User.create({
      ...value,
      password: hashedPassword,
    });

    await mailService.sendMailActivationCode(
      value.email,
      `${config.get("api_url")}/api/author/activate/${activation_link}`
    );

    res.status(201).send({
      message: "New user added",
      newUser,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const { error, value } = userValidation(req.body);
    if (error) {
      return res.status(400).send({ message: error.message });
    }

    const hashedPassword = bcrypt.hashSync(value.password, 7);

    const updatedUser = await User.updateOne(
      { _id: id },
      { ...value, password: hashedPassword }
    );

    res.status(201).send({
      message: "User updated",
      updatedUser,
    });
    console.log(updatedUser);
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteUserById = (req, res) => {
  try {
    const id = req.params.id;
    const deletedUser = User.deleteOne({ _id: id });
    console.log(deletedUser);
    res.status(200).send({ data: deletedUser });
  } catch (error) {
    console.log("salom");
    errorHandler(error, res);
  }
};

const logOutUser = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(404).send({ message: "Token topilmadi!" });
    }
    const user = User.findOneAndUpdate(
      { refreshToken: refreshToken },
      { refreshToken: "" },
      { new: true }
    );
    if (!user) {
      return res.status(404).send({ message: "bunday tokenli faoydalanuvchi mavjud emas!" });
    }

    res.clearCookie("refreshToken")
    res.status(201).send({ message: "Success"})

  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  getUsers,
  getUserById,
  addUser,
  updateUserById,
  deleteUserById,
  loginUser,
  logOutUser,
};
