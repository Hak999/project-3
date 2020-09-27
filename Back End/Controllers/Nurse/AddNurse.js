const Nurses = require("../../Models/Nurse");
const joi = require("@hapi/joi");
const schema = require("./AddNurseValid");
const bcrypt = require("bcrypt");

//For Validation
const _schema = joi.object(schema);

module.exports = async (req, res, next) => {
  const {
    email,
    first_name,
    last_name,
    password,
    department,
    mobile_number,
    address,
  } = req.body;

  const data = await Nurses.findOne({email});
  if(data)
  {
    return res.status(500).json({
      status: "failed",
      message: "Email Already Exist",
    });
  }
  console.log(data);
  const validate = _schema.validate(req.body);
  if (validate.error) {
    return res.status(400).json({
      status: "error",
      message: validate.error.details[0].message,
    });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log("hashed password", hashedPassword);
  const Nurse = new Nurses({
    email,
    first_name,
    last_name,
    password: hashedPassword,
    department,
    mobile_number,
    address,
    image: req.image,
  });
  try {
    const SaveUser = await Nurse.save();
    res.status(200).json({
      status: "Success",
      message: "Nurse Added Successfully",
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
