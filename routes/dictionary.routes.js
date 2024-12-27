const { addTerm, getAllDictionary, updateDictionaryById, deleteDictionaryById } = require("../controllers/dictionary.controller")

const router = require("express").Router()

router.get("/", getAllDictionary);
router.post("/", addTerm)
router.patch("/:id", updateDictionaryById);
router.delete("/:id", deleteDictionaryById);

module.exports = router