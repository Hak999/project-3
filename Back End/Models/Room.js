const mongoose = require("mongoose");

// const Schema = ;

const Room = mongoose.Schema(
  {
   roomNumber:String
  },
  {
    timestamps: true,
  }
);

const Rooms = mongoose.model("Rooms", Room);

module.exports = Rooms;
