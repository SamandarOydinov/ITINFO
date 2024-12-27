const {
  getUsers,
  getUserById,
  addUser,
  updateUserById,
  deleteUserById,
  logOutUser,
  loginUser,
} = require("../controllers/user.controller");
const admin_police = require("../police_middleware/admin_police");

const user_police = require("../police_middleware/user_police");
const userSelfPolice = require("../police_middleware/user_self_police");

const router = require("express").Router();

router.get("/", getUsers);
router.get("/:id", user_police, getUserById);
router.post("/add", admin_police, addUser);
router.post("/login", loginUser);
router.post("/logout", user_police, userSelfPolice, logOutUser);
router.patch("/:id", user_police, userSelfPolice, updateUserById);
router.delete("/:id", user_police, userSelfPolice, deleteUserById);

module.exports = router;
