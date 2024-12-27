const { errorHandler } = require("../helpers/error_Handler");
const Author_social = require("../schemas/Author_social");
const { author_socialValidation } = require("../validations/author_social.validation");

const getAllAuthor_Social = async (req, res) => {
    try {
      const data = await Author_social.find({});
      res.status(200).send({ data });
    } catch (error) {
      errorHandler(error, res);
    }
};

const addAuthor_social = async (req, res) => {
  try {
    const { error, value } = author_socialValidation(req.body);
    if (error) {
      return res.status(400).send({ message: error.message });
    }

    const hashedPassword = bcrypt.hashSync(value.author_password, 7);

    const newAuthor_social = await Author_social.create({
      ...value,
      author_password: hashedPassword,
    });

    res.status(201).send({
      message: "New author added",
      newAuthor,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateAuthor_socialById = async (req, res) => {
  try {
    const id = req.params.is;
    const {
      author_first_name,
      author_last_name,
      author_nick_name,
      author_email,
      author_phone,
      author_password,
      author_info,
      author_position,
      author_photo,
      is_expert,
      author_is_active,
    } = req.body;

    const updatedAuthor_social = await Author_social.updateOne(
      { _id: id },
      {
        author_first_name,
        author_last_name,
        author_nick_name,
        author_email,
        author_phone,
        author_password,
        author_info,
        author_position,
        author_photo,
        is_expert,
        author_is_active,
      }
    );

    res.status(201).send({
      message: "Author_social updated",
      updatedAuthor_social,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteAuthor_socialById = (req, res) => {
  try {
    const id = req.params.id;
    const deletedAuthor_social = Author_social.deleteOne({ _id: id });
    console.log(deletedAuthor_social);
    res.status(200).send({ data: deletedAuthor_social });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  getAllAuthor_Social,
  addAuthor_social,
  updateAuthor_socialById,
  deleteAuthor_socialById,
};
