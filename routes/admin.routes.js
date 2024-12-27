const {
  getAdmins,
  getAdminById,
  addAdmin,
  updateAdminById,
  deleteAdminById,
  loginAdmin,
  refreshAdminToken,
} = require("../controllers/admin.controller");

const admin_police = require("../police_middleware/admin_police");
const adminSelfPolice = require("../police_middleware/admin_self_police");

const router = require("express").Router();

// router.get("/all", admin_police, getAdmins);
router.get("/all", getAdmins);
router.get("/:id", admin_police, adminSelfPolice, getAdminById);
router.post("/add", addAdmin);
router.post("/login", loginAdmin);
router.patch("/:id", admin_police, adminSelfPolice, updateAdminById);
router.delete("/:id", admin_police, adminSelfPolice, deleteAdminById);
router.post("/refresh", refreshAdminToken);

module.exports = router;
