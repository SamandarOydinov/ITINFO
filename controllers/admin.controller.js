const { errorHandler } = require("../helpers/error_Handler");
const { to } = require("../helpers/to_promise");
const Admin = require("../schemas/Admin");
const adminJwt = require("../services/admin_service");
const { adminValidation } = require("../validations/admin.validation");
const bcrypt = require("bcrypt");
const config = require("config");
const uuid = require("uuid");
const mailService = require("../services/mail.service");


const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).send({ message: "AEmail yoki parol noto'g'ri" });
    }
    console.log("1", password);
    console.log("2", admin.password);
    const validPassword = bcrypt.compareSync(password, admin.password);
    console.log("ValidPassword", validPassword);
    if (!validPassword) {
      return res.status(401).send({ message: "Email yoki parol noto'g'ri1" });
    }

    const payload = {
      id: admin._id,
      email: email,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
    };

    const tokens = adminJwt.generateTokens(payload);

    admin.refresh_token = tokens.refreshToken;
    console.log("salom");
    
    console.log(admin);
    await admin.save();
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("admin_refresh_token_ms"),
    });

    // const token = jwt.sign(payload, config.get("tokenKey"), {
    //   expiresIn: config.get("tokenTime"),
    // })

    console.log("3", validPassword);
    res
      .status(200)
      .send({
        message: "Tizimga XUSH KELIBSIZ!",
        accesToken: tokens.accesToken,
      });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAdmins = async (req, res) => {
  try {
    const data = await Admin.find({});
    if (!data) {
      return res.status(404).send({ message: "Admin topilmadi!" });
    }
    res.status(200).send({ data: data });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAdminById = (req, res) => {
  try {
    const id = req.params.id;
    const admin = Admin.findOne({ id });
    if (!admin) {
      return res.status(404).send({ message: "not found Admin!" });
    }
    res.status(200).send({ data: admin });
  } catch (error) {
    errorHandler(error, res);
  }
};

const addAdmin = async (req, res) => {
  try {
    const { error, value } = adminValidation(req.body);
    if (error) {
      return res.status(400).send({ message: error.message });
    }

    const hashedPassword = bcrypt.hashSync(value.password, 7);

    const activation_link = uuid.v4()

    const newAdmin = await Admin.create({
      ...value,
      password: hashedPassword,
    });

    // await mailService.sendMailActivationCode(
    //   value.email,
    //   `${config.get("api_url")}/api/admin/activate/${activation_link}`
    // );

    res.status(201).send({
      message: "New admin added",
      newAdmin,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateAdminById = async (req, res) => {
  try {
    const id = req.params.id;
    const { error, value } = adminValidation(req.body);
    if (error) {
      return res.status(400).send({ message: error.message });
    }

    const hashedPassword = bcrypt.hashSync(value.password, 7);

    const updatedAdmin = await Admin.updateOne(
      { _id: id },
      { ...value, password: hashedPassword }
    );

    res.status(201).send({
      message: "Admin updated",
      updatedAdmin,
    });
    console.log(updatedAdmin);
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteAdminById = (req, res) => {
  try {
    const id = req.params.id;
    const deletedAdmin = Admin.deleteOne({ _id: id });
    console.log(deletedAdmin);
    res.status(200).send({ data: deletedAdmin });
  } catch (error) {
    console.log("salom");
    errorHandler(error, res);
  }
};

const logOut = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(404).send({ message: "Token topilmadi!" });
    }

    const admin = Admin.findOneAndUpdate(
      { refresh_token: refreshToken },
      { refresh_token: "" },
      { new: true }
    );
    if(!admin){
      return res.status(404).send({ message: "bunday tokenli shaxs topilmadi!" });
    }

    res.clearCookie("refreshToken")
    res.status(201).send({ message: "Success"})

  } catch (error) {
    errorHandler(error, res);
  }
};

const refreshAdminToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(400).send({ message: "Cookieda Token topilmadi!" });
    }
    console.log(refreshToken);
    const [error, tokenFromCookie] = await to(
      adminJwt.verifyRefreshToken(refreshToken)
    );
    if (error) {
      console.log(refreshToken);
      return res.status(401).send({ message: "Error verify refreshToken", error: error.message });
    }
    const admin = await Admin.findOne({ refresh_token: refreshToken });
    if (!admin) {
      return res.status(404).send({ message: "Admin not found!" });
    }

    const payload = {
      id: admin._id,
      email: admin.email,
      is_active: admin.is_active,
    };

    const tokens = adminJwt.generateTokens(payload);

    admin.refresh_token = tokens.refreshToken;
    await admin.save();
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("admin_refresh_token_ms"),
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
  getAdmins,
  getAdminById,
  addAdmin,
  updateAdminById,
  deleteAdminById,
  loginAdmin,
  logOut,
  refreshAdminToken,
};
