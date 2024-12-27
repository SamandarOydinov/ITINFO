const { errorHandler } = require("../helpers/error_Handler");
const Author = require("../schemas/Author");
const Description = require("../schemas/Description");
const { descValidation } = require("../validations/description.validation");

const getAllDescription = (req, res) => {
  try {
    const { data } = Description.find({});
    console.log(data);
    res.status(200).send({ data: data });
  } catch (error) {
    errorHandler(error, res);
  }
};

const addDescription = async (req, res) => {
  try {
    const { error, value } = descValidation(req.body);
    if (error) {
      return res.status(400).send({ message: error.message });
    }

    const newDescription = await Description.create({ value });

    res.status(201).send({
      message: "New Description added",
      newDescription,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateDescriptionById = async (req, res) => {
  try {
    const id = req.params.is;
    const { category_id, description } = req.body;

    const updatedDescription = await Description.updateOne(
      { _id: id },
      {
        category_id,
        description,
      }
    );

    res.status(201).send({
      message: "Description updated",
      updatedDescription,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteDescriptionById = (req, res) => {
  try {
    const id = req.params.id;
    const deletedDescription = Description.deleteOne({ _id: id });
    console.log(deletedDescription);
    res.status(200).send({ data: deletedDescription });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  getAllDescription,
  addDescription,
  updateDescriptionById,
  deleteDescriptionById,
};
