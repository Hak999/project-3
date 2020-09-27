const Appointments = require("../../Models/Appointments");
module.exports = async (req, res, next) => {
  const {id, doctor,
     patient,
      date,
      time,
      description,
       status,
       docCase,
       medication
  } = req.body;

  try {
    const UpdateAppointment = await Appointments.updateOne(
      { _id: id },
      {
        doctor,
        patient,
         date,
         time,
         description,
          status,
          docCase,
          medication,
          test:req.image
      }
    );
    console.log("our Appointments", UpdateAppointment);
    return res.status(200).json({
      status: "success",
      data: UpdateAppointment,
      message: "Prescription Added successfully",
    });
  } catch (e) {
    console.log("error", e);
    return res.status(500).json({
      status: "failed",
      message: "something went wrong",
    });
  }
};
