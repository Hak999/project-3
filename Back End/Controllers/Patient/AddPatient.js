const Patients = require("../../Models/Patient");
const joi = require("@hapi/joi");

const schema = require("./AddPatValid");
const bcrypt = require("bcrypt");

//For Validation
const _schema = joi.object(schema);

module.exports = async (req, res, next) => {
  const patientId = Math.ceil(Math.random() * 999999);
  console.log("pid", patientId);
  const {
    email,
    first_name,
    last_name,
    password,
    mobile_number,
    address,
    symptoms,
    appointed_doctor,
    appointment_status,
  } = req.body;
  const data = await Patients.findOne({ email });
  console.log(data);
  if (data) {
    return res.status(500).json({
      status: "failed",
      message: "Email Already Exist",
    });
  }
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
  const Patient = new Patients({
    email,
    first_name,
    last_name,
    password: hashedPassword,
    mobile_number,
    address,
    symptoms,
    patientId,
    appointed_doctor,
    appointment_status,
    image: req.image,
  });
  try {
    const SaveUser = await Patient.save();
    res.status(200).json({
      status: "Success",
      message: "Patient Added Successfully",
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
