const Doctors = require("../../Models/Doctor");
module.exports = async (req, res, next) => {
  const {
    id,
    email,
    first_name,
    last_name,
    password,
    specialization,
    mobile_number,
    address,
  } = req.body;
  try {
    const UpdateDoctor = await Doctors.updateOne(
      { _id: id },
      {
        email,
        first_name,
        last_name,
        password,
        specialization,
        mobile_number,
        address,
      }
    );
    console.log("our Doctors", UpdateDoctor);
    return res.status(200).json({
      status: "success",
      data: UpdateDoctor,
      message: "user updated successfully",
    });
  } catch (e) {
    console.log("error", e);
    return res.status(500).json({
      status: "failed",
      message: "something went wrong",
    });
  }
};
