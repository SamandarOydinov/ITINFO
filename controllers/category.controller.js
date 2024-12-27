const { errorHandler } = require("../helpers/error_Handler");
const Category = require("../schemas/Category");
const { categoryValidation } = require("../validations/category.validation");

const getAllCategory = (req, res) => {
    try {
      const { data } = Category.find({});
      console.log(data);
      res.status(200).send({ data: data });
    } catch (error) {
      errorHandler(error, res)
    }
}

const addCategory = async (req, res) => {
  try {

    const { error, value } = categoryValidation(req.body)
    if (error) {
      return res.status(400).send({ message: error.message });
    }

    const newCategory = await Category.create({ value });

    res.status(201).send({
      message: "New term added",
      newCategory,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateCategoryById = async (req, res) => {
  try {
    const id = req.params.is
    const {
      category_name, parent_category_id
    } = req.body;

    const updatedCategory = await Category.updateOne({_id: id},{
      category_name, parent_category_id
    });

    res.status(201).send({
      message: "Category updated",
      updatedCategory,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteCategoryById = (req, res) => {
  try {
    const id = req.params.id
    const deletedCategory = Category.deleteOne({_id: id});
    console.log(deletedCategory);
    res.status(200).send({ data: deletedCategory });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  getAllCategory,
  addCategory,
  updateCategoryById,
  deleteCategoryById,
};
