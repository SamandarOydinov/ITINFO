const { addAuthor, getAllAuthor, updateAuthorById, deleteAuthorById, loginAuthor, getAuthorById, logoutAuthor, refreshAuthorToken } = require("../controllers/author.controller");
const admin_police = require("../police_middleware/admin_police");
const author_police = require("../police_middleware/author_police");
const authorSelfPolice = require("../police_middleware/author_self_police");

const router = require("express").Router();

router.get("/", getAllAuthor);
router.get("/:id", author_police, authorSelfPolice,  getAuthorById);
router.post("/", admin_police, addAuthor);
router.post("/login", loginAuthor);
router.post("/logout", logoutAuthor)
router.patch("/:id", author_police, authorSelfPolice, updateAuthorById)
router.delete("/:id", author_police, authorSelfPolice, deleteAuthorById)
router.post("/refresh", refreshAuthorToken)

module.exports = router;