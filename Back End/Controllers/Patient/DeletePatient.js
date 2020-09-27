const Patients = require("../../Models/Patient");
module.exports = async (req, res, next) => {
  const { id } = req.params;
  console.log("our id is ", id, req.body);
  console.log("our params are ", req.params);
  try {
    const DeletedPatient = await Patients.findByIdAndDelete({ _id: id });
    console.log("our patients", DeletedPatient);
    return res.status(200).json({
      status: "success",
      data: DeletedPatient,
      message: "user deleted successfully",
    });
  } catch (e) {
    console.log("error", e);
    return res.status(500).json({
      status: "failed",
      message: "something went wrong",
    });
  }
};
