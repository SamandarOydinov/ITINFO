const {  getAllDescription, updateDescriptionById, deleteDescriptionById, addDescription } = require("../controllers/description.controller")

const router = require("express").Router()

router.get("/", getAllDescription);
router.post("/", addDescription)
router.patch("/:id", updateDescriptionById);
router.delete("/:id", deleteDescriptionById);

module.exports = router