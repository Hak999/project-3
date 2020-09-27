const Rooms = require("../../Models/Room");
module.exports = async (req, res, next) => {
  try {
    const AllRooms = await Rooms.find();
    // .populate({
    //   path: "patient", // either single path or multiple space delimited paths
    //   select: "first_name last_name mobile_number", // optional
    //   //   , model: 'Rooms'            // optional
    //   //   , match: { age: { $gte: 18 }}   // optional
    //   //   , options: { sort: { age:\ -1 }} // optional
    // });
    console.log("our Rooms", AllRooms);
    return res.status(200).json({
      status: "success",
      data: AllRooms,
    });
  } catch (e) {
    console.log("error", e);
    return res.status(500).json({
      status: "failed",
      message: "something went wrong",
    });
  }
};
