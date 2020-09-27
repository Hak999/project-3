const joi = require("@hapi/joi");

const AddDepartmentSchema = {
  name: joi.string().min(6).required(),
  description: joi.string().min(6).required(),
};

module.exports = AddDepartmentSchema;
