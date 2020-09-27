const Appointments = require("../../Models/Appointments");
const Patient = require("../../Models/Patient");
module.exports = async (req, res, next) => {
  const { id, doctorId } = req.params;
  try {
    const check = await Appointments.find({ patient: id, doctor: doctorId });
    console.log("our appointments", id);
    const appoints = await Appointments.find({
      patient: id,
    }).populate({
      path: "doctor patient", // either single path or multiple space delimited paths
      select: "patientId first_name last_name mobile_number address symptoms", // optional
      //   , model: 'doctors'            // optional
      //   , match: { age: { $gte: 18 }}   // optional
      //   , options: { sort: { age: -1 }} // optional
    });

    return res.status(200).json({
      status: "success",
      data: appoints,
    });
  } catch (e) {
    console.log("error", e);
    return res.status(500).json({
      status: "failed",
      message: "something went wrong",
    });
  }
};
async function getPatients(patients) {
  let searchResulst = [];
  for (const patientCheck of patients) {
    let contents = await Patient.find({ _id: patientCheck });
    if (contents.length > 0) {
      searchResulst.push(contents);
    }
  }
  return searchResulst;
}
