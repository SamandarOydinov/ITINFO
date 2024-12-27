const { addSynonym, getAllSynonym, updateSynonymById, deleteSynonymById } = require("../controllers/synonym.controller");

const router = require("express").Router();

router.get("/", getAllSynonym);
router.post("/", addSynonym);
router.patch("/:id", updateSynonymById);
router.delete("/:id", deleteSynonymById);

module.exports = router;
