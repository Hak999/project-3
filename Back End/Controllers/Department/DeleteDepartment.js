const Departments = require("../../Models/Department");
module.exports = async (req, res, next) => {
  const { id } = req.params;
  try {
    const DeletedDepartment = await Departments.findByIdAndDelete({ _id: id });
    console.log("our Department", DeletedDepartment);
    return res.status(200).json({
      status: "success",
      data: DeletedDepartment,
      message: "Department deleted successfully",
    });
  } catch (e) {
    console.log("error", e);
    return res.status(500).json({
      status: "failed",
      message: "something went wrong",
    });
  }
};
