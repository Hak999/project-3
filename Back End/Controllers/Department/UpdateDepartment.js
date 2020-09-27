const departments = require("../../Models/Department");
module.exports = async (req, res, next) => {
  const { id, name, description } = req.body;
  try {
    const Updatedepartment = await departments.updateOne(
      { _id: id },
      {
        name,
        description,
      }
    );
    console.log("our departments", Updatedepartment);
    return res.status(200).json({
      status: "success",
      data: Updatedepartment,
      message: "Department updated successfully",
    });
  } catch (e) {
    console.log("error", e);
    return res.status(500).json({
      status: "failed",
      message: "something went wrong",
    });
  }
};
