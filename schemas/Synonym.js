const { Schema, model } = require("mongoose");

const synonymSchema = new Schema({
  desc_id: String,
  dict_id: String
});

module.exports = model("Synonym", synonymSchema);
