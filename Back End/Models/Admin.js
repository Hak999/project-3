const mongoose = require("mongoose");

// const Schema = ;

const Admin = mongoose.Schema(
  {
    email: String,
    first_name: String,
    last_name: String,
    password: String,
    image: String,
  },
  {
    timestamps: true,
  }
);

const Admins = mongoose.model("Admins", Admin);

module.exports = Admins;
