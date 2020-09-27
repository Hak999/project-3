const Nurses = require("../../Models/Nurse");
module.exports = async (req, res, next) => {
  const {
    id,
    email,
    first_name,
    last_name,
    password,
    mobile_number,
    address,
  } = req.body;
  try {
    const UpdateNurse = await Nurses.updateOne(
      { _id: id },
      {
        email,
        first_name,
        last_name,
        password,
        mobile_number,
        address,
      }
    );
    console.log("our Nurses", UpdateNurse);
    return res.status(200).json({
      status: "success",
      data: UpdateNurse,
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
