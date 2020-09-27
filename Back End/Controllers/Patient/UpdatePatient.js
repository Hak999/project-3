const Patients = require("../../Models/Patient");
module.exports = async (req, res, next) => {
  const {
    id,
    email,
    first_name,
    last_name,
    password,
    address,
    mobile_number,
    symptoms,
    appointed_doctor,
  } = req.body;
  try {
    const UpdatePatient = await Patients.updateOne(
      { _id: id },
      {
        email,
        first_name,
        last_name,
        password,
        address,
        mobile_number,
        symptoms,
        appointed_doctor,
      }
    );
    console.log("our patients", UpdatePatient);
    return res.status(200).json({
      status: "success",
      data: UpdatePatient,
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
