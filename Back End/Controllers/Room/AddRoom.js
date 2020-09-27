const Rooms = require("../../Models/Room");
const joi = require("@hapi/joi");

const schema = require("./AddRoomValid");

//For Validation
const _schema = joi.object(schema);

module.exports = async (req, res, next) => {
  const { roomNumber } = req.body;
  const data = await Rooms.findOne();
  console.log(data);
  const validate = _schema.validate(req.body);
  if (validate.error) {
    return res.status(400).json({
      status: "error",
      message: validate.error.details[0].message,
    });
  }
  const User = new Rooms({
    roomNumber
  });
  try {
    const SaveUser = await User.save();
    res.status(200).json({
      status: "Success",
      message: "Room Added Successfully",
      data: SaveUser,
    });
  } catch (e) {
    console.log("error", e);
    return res.status(500).json({
      status: "failed",
      message: "Server is not responding",
    });
  }
};
