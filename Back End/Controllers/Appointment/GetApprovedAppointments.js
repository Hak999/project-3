const Appointments = require("../../Models/Appointments");
const Patient = require("../../Models/Patient");
module.exports = async (req, res, next) => {
  const { id } = req.params;
  try {
    const check = await Appointments.find({ doctor: id });
    console.log("our appointments", id);
    const appoints = await Appointments.distinct("patient", {
      doctor: id,
      status: "confirm",
    }).populate({
      path: "doctor patient", // either single path or multiple space delimited paths
      select: "patientId first_name last_name mobile_number address symptoms", // optional
      //   , model: 'doctors'            // optional
      //   , match: { age: { $gte: 18 }}   // optional
      //   , options: { sort: { age: -1 }} // optional
    });
    console.log(`appointments`, appoints);
    const patients = await getPatients(appoints);
    // appoints.forEach((element) => {
    //   let patient =await Patient.find({ _id: element });
    //   if (patient) {
    //     patients.push(patient);
    //   }
    // });
    console.log("patients", patients);

    // const appoints= await Appointments.find().populate(
    //     console.log("our appointments",appoints);
    return res.status(200).json({
      status: "success",
      data: patients,
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
