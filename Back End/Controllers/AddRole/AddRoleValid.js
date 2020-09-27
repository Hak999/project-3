const joi = require("@hapi/joi");

const AddRoleSchema = {
  email: joi.string().min(6).email().required(),
  first_name: joi.string().min(6).required(),
  last_name: joi.string().min(6).required(),
  date_of_birth: joi.date().required(),
  sex: joi.string().min(3).required(),
  specialization: joi.string().min(3),
  password: joi.string().min(6).required(),
  role: joi.string().required(),
};

module.exports = AddRoleSchema;
