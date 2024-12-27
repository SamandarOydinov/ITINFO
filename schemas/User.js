const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    info: String,
    photo: String,
    is_active: Boolean,
    refreshToken: String
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("User", userSchema);