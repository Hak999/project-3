const mongoose = require("mongoose");

// const Schema = ;

const Department = mongoose.Schema(
  {
    name: String,
    description: String,
  },
  {
    timestamps: true,
  }
);

const Departments = mongoose.model("Department", Department);

module.exports = Departments;
