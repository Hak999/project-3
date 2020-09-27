const Patients = require("../../Models/Patient");
module.exports = async (req, res, next) => {
  const { id, status } = req.body;
  try {
    const UpdatePatient = await Patients.updateOne(
      { _id: id },
      {
        appointment_status: status,
      }
    );
    console.log("our patients", UpdatePatient);
    return res.status(200).json({
      status: "success",
      data: UpdatePatient,
      message: "user updated successfully",
    });
  } catch (e) {
    console.log("error", e);
    return res.status(500).json({
      status: "failed",
      message: "something went wrong",
    });
  }
};
