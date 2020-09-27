const Patients = require("../../Models/Patient");
module.exports = async (req, res, next) => {
  try {
    const AllPatients = await Patients.find();
    console.log("our patients", AllPatients);
    return res.status(200).json({
      status: "success",
      data: AllPatients,
    });
  } catch (e) {
    console.log("error", e);
    return res.status(500).json({
      status: "failed",
      message: "something went wrong",
    });
  }
};
