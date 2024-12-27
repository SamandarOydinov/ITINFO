const { Schema, model } = require("mongoose");

const authorSchema = new Schema(
  {
    first_name: String,
    last_name: String,
    nick_name: String,
    email: String,
    phone: String,
    password: String,
    info: String,
    position: String,
    photo: String,
    is_expert: Boolean,
    is_active: Boolean,
    refresh_token: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("Author", authorSchema);
