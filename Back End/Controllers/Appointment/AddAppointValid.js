const joi = require("@hapi/joi");

const AddAppointSchema = {
  doctor: joi.string().min(6).required(),
  patient: joi.string().min(3).required(),
  date: joi.date().min(3).required(),
  time:joi.string(),
  description: joi.string().min(6).required(),
  status: joi.string().min(3).required(),
  docCase:joi.string(),
  test:joi.string(),
  medication:joi.string()
};

module.exports = AddAppointSchema;
