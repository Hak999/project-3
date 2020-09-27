const mongoose = require("mongoose");

// const Schema = ;

const Doctor = mongoose.Schema(
  {
    email: String,
    first_name: String,
    last_name: String,
    password: String,
    department: [{ type: mongoose.Schema.Types.ObjectId, ref: "Department" }],
    mobile_number: String,
    address: String,
    image: String,
  },
  {
    timestamps: true,
  }
);

const Doctors = mongoose.model("Doctors", Doctor);

module.exports = Doctors;
