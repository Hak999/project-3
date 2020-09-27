const Nurses = require("../../Models/Nurse");
module.exports = async (req, res, next) => {
  const { id } = req.params;
  try {
    const DeletedNurse = await Nurses.findByIdAndDelete({ _id: id });
    console.log("our Nurse", DeletedNurse);
    return res.status(200).json({
      status: "success",
      data: DeletedNurse,
      message: "Nurse deleted successfully",
    });
  } catch (e) {
    console.log("error", e);
    return res.status(500).json({
      status: "failed",
      message: "something went wrong",
    });
  }
};
