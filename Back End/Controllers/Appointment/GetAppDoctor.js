const Appointments = require("../../Models/Appointments");
module.exports = async (req, res, next) => {
  const { id } = req.params;
  try {
    const check = await Appointments.find({ doctor: id });
    console.log("our appointments", id);
    const appoints = await Appointments.find({
      doctor: id,
    }).populate({
      path: "doctor patient", // either single path or multiple space delimited paths
      select: "first_name last_name mobile_number address symptoms", // optional
      //   , model: 'doctors'            // optional
      //   , match: { age: { $gte: 18 }}   // optional
      //   , options: { sort: { age: -1 }} // optional
    });

    const patients = await Appointments.distinct("patient", {
      doctor: id,
      status: "confirm",
    }).populate({
      path: "doctor patient", // either single path or multiple space delimited paths
      select: "patientId first_name last_name mobile_number address symptoms", // optional
    });

    return res.status(200).json({
      status: "success",
      data: appoints,
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
