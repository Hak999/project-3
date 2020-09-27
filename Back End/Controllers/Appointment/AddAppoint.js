const Appointments = require("../../Models/Appointments");
const Patients=require("../../Models/Patient");
const Doctors=require("../../Models/Doctor");
const joi = require("@hapi/joi");
const sgMail = require("@sendgrid/mail");

const schema = require("./AddAppointValid");

//For Validation
const _schema = joi.object(schema);

require("dotenv").config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = async (req, res, next) => {
  const { doctor, patient, date, description, status,time } = req.body;
  const data = await Appointments.findOne();
  console.log(data);
  const validate = _schema.validate(req.body);
  if (validate.error) {
    return res.status(400).json({
      status: "error",
      message: validate.error.details[0].message,
    });
  }


  const Appointment = new Appointments({
    doctor,
    patient,
    date,
    description,
    status,
    time
  });

    const SaveUser = await Appointment.save();

    if(SaveUser){
      const patient1=await Patients.findOne({_id:patient});
      const doctor1=await Doctors.findById({_id:doctor});

      console.log("our patient is ::",patient1);
      console.log("our Doctor is ::",doctor1);
        const msg = {
          to: patient1.email,
          from: process.env.FROM,
          subject: "Appointment Detail",
          // text: `otp is ${otp}`,
          html: `
          <div><strong>Date :</strong><p>${SaveUser.date} ${SaveUser.time}</p></div>
          <div><strong>Doctor :</strong><p>${doctor1.first_name} ${doctor1.last_name}</p></div>
          <div><strong>Doctor Mobile :</strong><p>${doctor1.mobile_number}</p></div>
          <div><strong>Symptoms :</strong><p>${patient1.symptoms}</p></div>
          `,
        };
        console.log("our masg",msg);
        sgMail
        .send(msg)
        .then (response => {
          console.log("Message sent",response);
        return res.status(200).json({
            status: "Success",
            message: "Appointment Added Successfully",
            data: SaveUser,
          });
        })


      }else{
        console.log("server issue",e);

        return res.status(500).json({
          status: "failed",
          message: "Server is not responding",
        });
      }

  };
