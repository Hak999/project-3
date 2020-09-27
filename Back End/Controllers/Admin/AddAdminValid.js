const joi = require("@hapi/joi");

const AddAdminSchema = {
  email: joi.string().min(6).email().required(),
  first_name: joi.string().min(6).required(),
  last_name: joi.string().min(6).required(),
  password: joi.string().min(3).required(),
};

module.exports = AddAdminSchema;
