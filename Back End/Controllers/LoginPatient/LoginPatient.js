const Patients = require("../../Models/Patient");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const joi = require("@hapi/joi");

const schema = require("./LoginPatientValid");

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
  const patient = await Patients.findOne({ email: email });
  if (!patient) {
    return res.status(400).json({
      status: "failed",
      message: "Email not Found",
    });
  }
  const validPass = await bcrypt.compare(password, patient.password);
  if (!validPass) {
    return res.status(400).json({
      status: "Failed",
      message: "Password is incorrect",
    });
  }
  const webToken = jwt.sign({ _id: patient._id }, process.env.SECRET_KEY);
  res.header("auth-token", webToken);
  res.status(200).json({
    status: "success",
    person: patient,
    webToken: webToken,
    id: patient._id,
  });
};
