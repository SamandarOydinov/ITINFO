const { Schema, model } = require("mongoose");

const author_socialSchema = new Schema(
  {
    author_id: String,
    social_id: String,
    social_link: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("Author_social", author_socialSchema)