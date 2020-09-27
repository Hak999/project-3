const Rooms = require("../../Models/Room");
module.exports = async (req, res, next) => {
  const { id, patient, date, status, roomNumber } = req.body;
  try {
    const UpdateRoom = await Rooms.updateOne(
      { _id: id },
      {
        patient,
        date,
        status,
        roomNumber,
      }
    );
    console.log("our Rooms", UpdateRoom);
    return res.status(200).json({
      status: "success",
      data: UpdateRoom,
      message: "user updated successfully",
    });
  } catch (e) {
    console.log("error", e);
    return res.status(500).json({
      status: "failed",
      message: "something went wrong",
    });
  }
};
