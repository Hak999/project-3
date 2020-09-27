const joi = require("@hapi/joi");

const AddPatientSchema = {
  email: joi.string().min(6).email().required(),
  first_name: joi.string().min(3).required(),
  last_name: joi.string().min(3).required(),
  password: joi.string().min(6).required(),
  symptoms: joi.string().min(3).required(),
  mobile_number: joi.string().min(6).required(),
  address: joi.string().min(6).required(),
  // appointed_doctor: joi.string().min(3).required(),
  appointment_status: joi.string().required(),
};

module.exports = AddPatientSchema;
