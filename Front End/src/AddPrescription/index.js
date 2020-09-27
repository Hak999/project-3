import React, { useState, useEffect } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import classes from "./style.module.css";
import { withRouter } from "react-router-dom";
import DoctorWrapper from "../DoctorWrapper";
const AddPrescription = (props) => {
  const [id, setId] = useState("");
  const [docCase, setDocCase] = useState("");
  const [medication, setMedication] = useState("");
  const [image, setImage] = useState();
  const [patId, setPatId] = useState("");
  const [docId, setDocId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("");
  useEffect(() => {
    const app = JSON.parse(localStorage.getItem("updateAppointment"));
    if (app) {
      setId(app._id);
      setPatId(app.patient[0]._id);
      setDocId(app.doctor[0]._id);
      setDate(app.date);
      setTime(app.time);
      setDesc(app.description);
      setStatus(app.status);
    }
  }, []);

  const AddPrescription = (e) => {
    e.preventDefault();
    console.log(image);
    console.log(image.type);
    if (image.type !== "application/pdf") {
      alert("please select a pdf file");
      return;
    }

    const data = new FormData();
    data.append("id", id);
    data.append("doctor", docId);
    data.append("patient", patId);
    data.append("date", date);
    data.append("time", time);
    data.append("description", desc);
    data.append("status", status);
    data.append("docCase", docCase);
    data.append("medication", medication);
    data.append("profileImage", image);
    Axios({
      method: "PUT",
      url: `${process.env.REACT_APP_BASE_URL}/updateAppointment`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // authorization: TOKEN
      },
      data: data,
    })
      .then((response) => {
        Swal.fire("Success", "Appointment Updated Successfully", "success");
        props.history.push("/doctors-appointments");
      })
      .catch((e) => {
        Swal.fire(
          "error",
          `${e.response.data.message}`.toLocaleUpperCase(),
          "error"
        );
      });
  };
  return (
    <DoctorWrapper>
      <h1 style={{ textAlign: "center" }}>Add/Update Prescription</h1>
      <div className={classes.Wrapper}>
        {/* <div className={classes.header}>
        <h1>Add/Edit Patient</h1>
      </div> */}
        <form onSubmit={AddPrescription}>
          <div className={classes.groupInput}>
            {" "}
            <textarea
              placeholder='Case'
              value={docCase}
              required
              className={classes.input}
              onChange={(e) => setDocCase(e.target.value)}
            />
            <textarea
              placeholder='Medication'
              value={medication}
              required
              className={classes.input}
              onChange={(e) => setMedication(e.target.value)}
            />
          </div>
          <input
            type='file'
            style={{ marginLeft: "2.5%" }}
            placeholder='Upload Test File'
            onChange={(e) => setImage(e.target.files[0])}
          />
          <br />
          <br />
          <button type='submit' className={classes.submit}>
            Submit
          </button>
        </form>
      </div>
    </DoctorWrapper>
  );
};

export default withRouter(AddPrescription);
