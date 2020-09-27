const mongoose = require("mongoose");

// const Schema = ;

const Appointment = mongoose.Schema(
  {
    doctor: [{ type: mongoose.Schema.Types.ObjectId, ref: "Doctors" }],
    patient: [{ type: mongoose.Schema.Types.ObjectId, ref: "Patients" }],
    date: Date,
    time: String,
    description: String,
    status: String,
    docCase: String,
    test: String,
    isAdded: { type: Boolean, default: false },
    medication: String,
  },
  {
    timestamps: true,
  }
);

const Appointments = mongoose.model("Appointments", Appointment);

module.exports = Appointments;
