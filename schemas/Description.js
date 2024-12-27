const { Schema, model } = require("mongoose");

const descSchema = new Schema({
  category_id: Number,
  description: String,
});

module.exports = model("Description", descSchema);
