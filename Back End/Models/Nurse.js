const mongoose = require("mongoose");

// const Schema = ;

const Nurse = mongoose.Schema(
  {
    email: String,
    first_name: String,
    last_name: String,
    password: String,
    address: String,
    mobile_number: String,
    image: String,
  },
  {
    timestamps: true,
  }
);

const Nurses = mongoose.model("Nurses", Nurse);

module.exports = Nurses;
