const Nurses = require("../../Models/Nurse");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const joi = require("@hapi/joi");

const schema = require("./LoginNurseValid");

//For Validation
const _schema = joi.object(schema);
module.exports = async (req, res, next) => {
  const { email, password } = req.body;
  const validate = _schema.validate(req.body);
  if (validate.error) {
    return res.status(400).json({
      status: "error",
      message: validate.error.details[0].message,
    });
  }
  const Nurse = await Nurses.findOne({ email: email });
  if (!Nurse) {
    return res.status(400).json({
      status: "failed",
      message: "Email not Found",
    });
  }
  const validPass = await bcrypt.compare(password, Nurse.password);
  if (!validPass) {
    return res.status(400).json({
      status: "Failed",
      message: "Password is incorrect",
    });
  }
  const webToken = jwt.sign({ _id: Nurse._id }, process.env.SECRET_KEY);
  res.header("auth-token", webToken);
  res.status(200).json({
    status: "success",
    person: Nurse,
    webToken: webToken,
    id: Nurse._id,
  });
};
