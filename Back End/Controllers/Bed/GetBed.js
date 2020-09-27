const Beds = require("../../Models/Bed");
module.exports = async (req, res, next) => {
  const {id}=req.params;
  try {
    const AllBeds = await Beds.find({room:id}).populate({
      path: "patient room", // either single path or multiple space delimited paths
      select: "first_name last_name mobile_number symptoms roomNumber", // optional
      //   , model: 'Beds'            // optional
      //   , match: { age: { $gte: 18 }}   // optional
      //   , options: { sort: { age:\ -1 }} // optional
    });
    console.log("our Beds", AllBeds);
    return res.status(200).json({
      status: "success",
      data: AllBeds,
    });
  } catch (e) {
    console.log("error", e);
    return res.status(500).json({
      status: "failed",
      message: "something went wrong",
    });
  }
};
