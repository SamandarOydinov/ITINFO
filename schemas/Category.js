const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
  category_name: String,
  parent_category_id: String,
});

module.exports = model("Category", categorySchema);
