const joi = require("@hapi/joi");

const LoginNurseSchema = {
  email: joi.string().min(6).email().required(),
  password: joi.string().required(),
};

module.exports = LoginNurseSchema;
