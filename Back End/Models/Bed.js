const mongoose = require("mongoose");

// const Schema = ;

const Bed = mongoose.Schema(
  {
    room: [{ type: mongoose.Schema.Types.ObjectId, ref: "Rooms" }],
    patient: [{ type: mongoose.Schema.Types.ObjectId, ref: "Patients" }],
    status:Boolean,
    bedNumber:String,
    allotDate:Date
  },
  {
    timestamps: true,
  }
);

const Beds = mongoose.model("Beds", Bed);

module.exports = Beds;
