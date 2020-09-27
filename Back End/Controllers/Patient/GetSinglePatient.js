const Patients = require("../../Models/Patient");
module.exports = async (req, res, next) => {
  try {
    const patientId = req.params.id;
    const patient = await Patients.findById({ _id: patientId });
    console.log("requested patient", patient);
    return res.status(200).json({
      status: "success",
      data: patient,
    });
  } catch (e) {
    console.log("error", e);
    return res.status(500).json({
      status: "failed",
      message: "something went wrong",
    });
  }
};
