const mongoose = require("mongoose");

// const Schema = ;

const User = mongoose.Schema(
  {
    email: String,
    first_name: String,
    last_name: String,
    date_of_birth: Date,
    sex: String,
    specialization: String,
    password: String,
    role: String,
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model("Users", User);

module.exports = Users;
