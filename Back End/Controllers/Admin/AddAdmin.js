const Admins = require("../../Models/Admin");
const joi = require("@hapi/joi");

const schema = require("./AddAdminValid");
const bcrypt = require("bcrypt");

//For Validation
const _schema = joi.object(schema);

module.exports = async (req, res, next) => {
  const { email, first_name, last_name, password } = req.body;
  const data = await Admins.findOne({email});
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
  const User = new Admins({
    email,
    first_name,
    last_name,
    password: hashedPassword,
    image: req.image,
  });
  try {
    const SaveUser = await User.save();
    res.status(200).json({
      status: "Success",
      message: "Admin Added Successfully",
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
