const Doctors = require("../../Models/Doctor");
const Patients = require("../../Models/Patient");
const Appointments = require("../../Models/Appointments");

module.exports = async (req, res, next) => {
  try {
    const AllDoctors = await Doctors.find();
    const AllAppointments = await Appointments.find();
    const AllPatients = await Patients.find();

    console.log("our Doctors", AllDoctors);
    return res.status(200).json({
      status: "success",
      doctors: AllDoctors.length,
      patients: AllPatients.length,
      appointments: AllAppointments.length,
    });
  } catch (e) {
    console.log("error", e);
    return res.status(500).json({
      status: "failed",
      message: "something went wrong",
    });
  }
};
