const { errorHandler } = require("../helpers/error_Handler");
const Synonym = require("../schemas/Synonym");

const getAllSynonym = (req, res) => {
  try {
    const {data} = Synonym.find();
    console.log(data);
    res.status(200).send({ data: data });
  } catch (error) {
    errorHandler(error, res);
  }
};

const addSynonym = async (req, res) => {
  try {
    const { error, value } = synonymValidation(req.body);
    if (error) {
      return res.status(400).send({ message: error.message });
    }

    const newSynonym = await Synonym.create({ value });

    res.status(201).send({
      message: "New synonym added",
      newSynonym,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateSynonymById = async (req, res) => {
  try {
    const id = req.params.is;
    const { desc_id, dict_id } = req.body;

    const updatedSynonym = await Synonym.updateOne(
      { _id: id },
      {
        desc_id,
        dict_id,
      }
    );

    res.status(201).send({
      message: "Synonym updated",
      updatedSynonym,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteSynonymById = (req, res) => {
  try {
    const id = req.params.id;
    const deletedSynonym = Synonym.deleteOne({ _id: id });
    console.log(deletedSynonym);
    res.status(200).send({ data: deletedSynonym });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  getAllSynonym,
  addSynonym,
  updateSynonymById,
  deleteSynonymById,
};
