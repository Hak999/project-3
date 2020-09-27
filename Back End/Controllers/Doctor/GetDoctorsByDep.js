const Doctors = require("../../Models/Doctor");
module.exports = async (req, res, next) => {
  const { id } = req.body;
  try {
    const AllDoctors = await Doctors.find({ department: id });
    // .populate({
    //     path: 'department'        // either single path or multiple space delimited paths
    //   , select: 'name description'            // optional
    // //   , model: 'doctors'            // optional
    // //   , match: { age: { $gte: 18 }}   // optional
    // //   , options: { sort: { age: -1 }} // optional
    // });
    console.log("our Doctors", AllDoctors);
    return res.status(200).json({
      status: "success",
      data: AllDoctors,
    });
  } catch (e) {
    console.log("error", e);
    return res.status(500).json({
      status: "failed",
      message: "something went wrong",
    });
  }
};
