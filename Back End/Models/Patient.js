const mongoose = require("mongoose");

// const Schema = ;

const Patient = mongoose.Schema(
  {
    email: String,
    first_name: String,
    last_name: String,
    password: String,
    patientId: Number,
    address: String,
    mobile_number: String,
    symptoms: String,
    appointed_doctor: String,
    appointment_status: String,
    image: String,
  },
  {
    timestamps: true,
  }
);

const Patients = mongoose.model("Patients", Patient);

module.exports = Patients;
