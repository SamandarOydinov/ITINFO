const { errorHandler } = require("../helpers/error_Handler");
const Dictionary = require("../schemas/Dictionary");
const { dictValidation } = require("../validations/dictionary.validation");

const getAllDictionary = async (req, res) => {
  try {
    const data = await Dictionary.find({});
    console.log("+>/", data);
    res.status(200).send({ data: data });
  } catch (error) {
    errorHandler(error, res);
  }
};

const addTerm = async (req, res) => {
  try {
    const { error, value } = dictValidation(req.body);
    if (error) {
      return res.status(400).send({ message: error.message });
    }
    const oldTerm = await Dictionary.findOne({ term: value.term });
    if (oldTerm) {
      return res.status(400).send({
        msmessageg: "this term already exists!",
      });
    }
    const newTerm = await Dictionary.create({ ...value, letter: value.term[0] });

    res.status(201).send({
      message: "New term added",
      newTerm,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};


const updateDictionaryById = async (req, res) => {
  try {
    const id = req.params.is
    const {
      term
    } = req.body;

    const updatedDictionary = await Dictionary.updateOne({_id: id},{
      term, letter: term[0]
    });

    res.status(201).send({
      message: "Dictionary updated",
      updatedDictionary,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteDictionaryById = (req, res) => {
  try {
    const id = req.params.id
    const deletedDictionary = Dictionary.deleteOne({_id: id});
    console.log(deletedDictionary);
    res.status(200).send({ data: deletedDictionary });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  getAllDictionary,
  addTerm,
  updateDictionaryById,
  deleteDictionaryById,
};
