const Departments = require("../../Models/Department");
const joi = require("@hapi/joi");
const schema = require("./AddDepValid");

//For Validation
const _schema = joi.object(schema);

module.exports = async (req, res, next) => {
  const { name, description } = req.body;

  const data = await Departments.findOne();
  console.log(data);
  const validate = _schema.validate(req.body);
  if (validate.error) {
    return res.status(400).json({
      status: "error",
      message: validate.error.details[0].message,
    });
  }
  const Department = new Departments({
    name,
    description,
  });
  try {
    const SaveUser = await Department.save();
    res.status(200).json({
      status: "Success",
      message: "Department Added Successfully",
      data: SaveUser,
    });
  } catch (e) {
    console.log("error", e);
    return res.status(500).json({
      status: "failed",
      message: "Server is not responding",
    });
  }
};
