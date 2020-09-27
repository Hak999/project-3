const Appointments = require("../../Models/Appointments");
const ObjectID = require("mongoose").ObjectID;
module.exports = async (req, res, next) => {
  const { id } = req.params;
  try {
    const check = await Appointments.find({ patient: id });
    console.log("our appointments", id);
    const appoints = await Appointments.find({ patient: id }).populate({
      path: "doctor patient", // either single path or multiple space delimited paths
      select:
        "first_name last_name mobile_number address specialization symptoms", // optional
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
