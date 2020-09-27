const joi = require("@hapi/joi");

const AddBedSchema = {
  room: joi.string().min(6).required(),
  patient: joi.string().min(3),
  status: joi.boolean().required(),
  bedNumber:joi.string().required(),
  allotDate:joi.date()
};

module.exports = AddBedSchema;
