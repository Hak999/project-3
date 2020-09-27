const joi = require("@hapi/joi");

const AddRoomSchema = {
  roomNumber: joi.string().min(1).required(),
};

module.exports = AddRoomSchema;
