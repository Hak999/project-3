const Beds = require("../../Models/Bed");
module.exports = async (req, res, next) => {
  const { id, patient,allotDate,status } = req.body;
  try {
    const UpdateBed = await Beds.updateOne(
      { _id: id },
      {
        patient,
        allotDate,
        status,
      }
    );
    console.log("our Beds", UpdateBed);
    return res.status(200).json({
      status: "success",
      data: UpdateBed,
      message: "Bed updated successfully",
    });
  } catch (e) {
    console.log("error", e);
    return res.status(500).json({
      status: "failed",
      message: "something went wrong",
    });
  }
};
