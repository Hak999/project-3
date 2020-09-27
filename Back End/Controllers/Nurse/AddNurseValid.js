const joi = require("@hapi/joi");

const AddNurseSchema = {
  email: joi.string().min(6).email().required(),
  first_name: joi.string().min(3).required(),
  last_name: joi.string().min(3).required(),
  password: joi.string().min(6).required(),
  mobile_number: joi.string().min(6).required(),
  address: joi.string().min(6).required(),
};

module.exports = AddNurseSchema;
