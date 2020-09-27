const joi = require("@hapi/joi");

const LoginPatientSchema = {
  email: joi.string().min(6).email().required(),
  password: joi.string().required(),
};

module.exports = LoginPatientSchema;
