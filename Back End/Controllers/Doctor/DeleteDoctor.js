const Doctors = require("../../Models/Doctor");
module.exports = async (req, res, next) => {
  const { id } = req.params;
  try {
    const DeletedDoctor = await Doctors.findByIdAndDelete({ _id: id });
    console.log("our Doctor", DeletedDoctor);
    return res.status(200).json({
      status: "success",
      data: DeletedDoctor,
      message: "Doctor deleted successfully",
    });
  } catch (e) {
    console.log("error", e);
    return res.status(500).json({
      status: "failed",
      message: "something went wrong",
    });
  }
};
