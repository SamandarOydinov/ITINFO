const { addCategory, getAllCategory, updateCategoryById, deleteCategoryById } = require("../controllers/category.controller");

const router = require("express").Router();

router.get("/", getAllCategory)
router.post("/", addCategory);
router.patch("/:id", updateCategoryById)
router.delete("/:id", deleteCategoryById)

module.exports = router;
