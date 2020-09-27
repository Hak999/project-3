const Appointments = require("../../Models/Appointments");
module.exports = async (req, res, next) => {
  try {
    const allAppointments = await Appointments.find();
    console.log("our app", allAppointments);
    if (allAppointments.length === 0) {
      return res.status(200).json({
        status: "success",
        data: allAppointments,
      });
    }
    const appoints = await Appointments.find().populate({
      path: "doctor patient", // either single path or multiple space delimited paths

      //   , model: 'doctors'            // optional
      //   , match: { age: { $gte: 18 }}   // optional
      //   , options: { sort: { age: -1 }} // optional
    });

    // const appoints= await Appointments.find().populate(
    //     console.log("our appointments",appoints);
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
