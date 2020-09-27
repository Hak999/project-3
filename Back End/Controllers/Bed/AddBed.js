const Beds = require("../../Models/Bed");
const joi = require("@hapi/joi");

const schema = require("./AddBedValid");

//For Validation
const _schema = joi.object(schema);

module.exports = async (req, res, next) => {
  const { room, patient, status,bedNumber,allotDate } = req.body;
  const data = await Beds.findOne();
  console.log(data);
  const validate = _schema.validate(req.body);
  if (validate.error) {
    return res.status(400).json({
      status: "error",
      message: validate.error.details[0].message,
    });
  }
  const User = new Beds({
    room,
    patient,
    status,
    bedNumber,
    allotDate
  });
  try {
    const SaveUser = await User.save();
    res.status(200).json({
      status: "Success",
      message: "Bed Added Successfully",
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