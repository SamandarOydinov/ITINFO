const { Schema, model } = require("mongoose");

const adminSchema = new Schema(
  {
    name: String,
    email: String,
    phone: String,
    password: String,
    is_active: Boolean,
    is_creator: Boolean,
    refresh_token: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("Admin", adminSchema);
