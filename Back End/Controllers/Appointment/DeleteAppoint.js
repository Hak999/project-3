const Appointments = require("../../Models/Appointments");
module.exports = async (req, res, next) => {
  const { id } = req.params;
  console.log("apoint id", id);
  try {
    const DeletedAppointment = await Appointments.findByIdAndDelete({
      _id: id,
    });
    console.log("our Doctor", DeletedAppointment);
    return res.status(200).json({
      status: "success",
      data: DeletedAppointment,
      message: "Appointment deleted successfully",
    });
  } catch (e) {
    console.log("error", e);
    return res.status(500).json({
      status: "failed",
      message: "something went wrong",
    });
  }
};
