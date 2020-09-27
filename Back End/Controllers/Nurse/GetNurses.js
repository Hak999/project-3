const Nurses = require("../../Models/Nurse");
module.exports = async (req, res, next) => {
  try {
    const AllNurses = await Nurses.find();
    // .populate({
    // path: 'department'        // either single path or multiple space delimited paths
    //   , select: 'name description'            // optional
    //   , model: 'Nurses'            // optional
    //   , match: { age: { $gte: 18 }}   // optional
    //   , options: { sort: { age: -1 }} // optional
    // });
    console.log("our Nurses", AllNurses);
    return res.status(200).json({
      status: "success",
      data: AllNurses,
    });
  } catch (e) {
    console.log("error", e);
    return res.status(500).json({
      status: "failed",
      message: "something went wrong",
    });
  }
};
