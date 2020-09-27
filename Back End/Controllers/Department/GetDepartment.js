const Departments = require("../../Models/Department");
module.exports = async (req, res, next) => {
  try {
    const AllDepartments = await Departments.find();
    console.log("our Departments", AllDepartments);
    return res.status(200).json({
      status: "success",
      data: AllDepartments,
    });
  } catch (e) {
    console.log("error", e);
    return res.status(500).json({
      status: "failed",
      message: "something went wrong",
    });
  }
};
