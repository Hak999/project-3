const joi = require("@hapi/joi");

const LoginAdminSchema = {
  email: joi.string().min(6).email().required(),
  password: joi.string().required(),
};

module.exports = LoginAdminSchema;
