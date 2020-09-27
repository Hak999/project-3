const Patient = require("../../Models/Patient");
const Room = require("../../Models/Room");
module.exports = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    const patients = await Patient.find();
    return res.status(200).json({
      status: "success",
      data: rooms,
      patients: patients,
    });
  } catch (e) {
    console.log("error", e);
    return res.status(500).json({
      status: "failed",
      message: "something went wrong",
    });
  }
};
