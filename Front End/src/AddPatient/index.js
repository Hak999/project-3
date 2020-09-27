import React, { useState, useEffect } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import classes from "./style.module.css";
import { withRouter } from "react-router-dom";
const AddPatient = (props) => {
  //For all doctors
  const [doctors, setDoctors] = useState([]);
  //Simple data
  const [update, setUpdate] = useState(false);
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [appointedDoc, setAppointedDoc] = useState("");
  const [image, setImage] = useState([]);
  useEffect(() => {
    setUpdate(false);
    const patient = JSON.parse(localStorage.getItem("updatePatient"));
    if (patient) {
      setUpdate(true);
      setId(patient._id);
      setEmail(patient.email);
      setFirstName(patient.first_name);
      setLastName(patient.last_name);
      setSymptoms(patient.symptoms);
      setMobile(patient.mobile_number);
      setAddress(patient.address);
      setAppointedDoc(patient.appointed_doctor);
      setPassword(patient.password);
    }
    Axios.get(`${process.env.REACT_APP_BASE_URL}/getAllDoctors`)
      .then((response) => {
        console.log("data", response);

        setDoctors([...response.data.data]);
      })
      .catch((e) => {
        Swal.fire(
          "error",
          `${e.response.data.message}`.toLocaleUpperCase(),
          "error"
        );
      });
  }, []);
  const onUpdate = () => {
    Axios.put(`${process.env.REACT_APP_BASE_URL}/updatePatient`, {
      id: id,
      email: email,
      first_name: firstName,
      last_name: lastName,
      password: password,
      symptoms: symptoms,
      mobile_number: mobile,
      address: address,
      appointed_doctor: appointedDoc,
    })
      .then((response) => {
        Swal.fire("Success", "Patient Updated Successfully", "success");
        localStorage.removeItem("updatePatient");
        props.history.push("/patients");
      })
      .catch((e) => {
        Swal.fire(
          "error",
          `${e.response.data.message}`.toLocaleUpperCase(),
          "error"
        );
      });
  };
  const AddPatient = () => {
    const data = new FormData();
    data.append("email", email);
    data.append("first_name", firstName);
    data.append("last_name", lastName);
    data.append("password", password);
    data.append("symptoms", symptoms);
    data.append("mobile_number", mobile);
    data.append("address", address);
    // data.append('appointed_doctor',appointedDoc);
    data.append("appointment_status", "on-Hold");
    data.append("profileImage", image);
    if (password !== confirmPass) {
      return Swal.fire(
        "error",
        "Password and Confirm Password Should be Same",
        "error"
      );
    }
    Axios({
      method: "POST",
      url: `${process.env.REACT_APP_BASE_URL}/AddPatient`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // authorization: TOKEN
      },
      data: data,
    })
      .then((response) => {
        Swal.fire("Success", "Patient Added Successfully", "success");
        if (localStorage.getItem("role") === "admin") {
          props.history.push("/patients");
        } else {
          props.history.push("/");
        }
      })
      .catch((e) => {
        Swal.fire(
          "error",
          `${e.response.data.message}`.toLocaleUpperCase(),
          "error"
        );
      });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (update) {
      onUpdate();
    } else {
      AddPatient();
    }
  };
  return (<>
    {localStorage.getItem("role")==="admin"?<h1 style={{textAlign:"center"}}></h1> :null}
    <div className={classes.Wrapper}>
      {/* <div className={classes.header}>
        <h1>Add/Edit Patient</h1>
      </div> */}
      <form onSubmit={onSubmit}>
        <div className={classes.groupInput}>
          {" "}
          <input
            placeholder="Email"
            required
            value={email}
            type="email"
            className={classes.input}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="First Name"
            value={firstName}
            required
            className={classes.input}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className={classes.groupInput}>
          {" "}
          <input
            placeholder="Last Name"
            value={lastName}
            required
            className={classes.input}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            placeholder="Symptoms"
            value={symptoms}
            required
            className={classes.input}
            onChange={(e) => setSymptoms(e.target.value)}
          />
        </div>
        <div className={classes.groupInput}>
          {" "}
          <input
            placeholder="Mobile Number"
            value={mobile}
            required
            className={classes.input}
            onChange={(e) => setMobile(e.target.value)}
          />
          <input
            placeholder="Address"
            value={address}
            required
            className={classes.input}
            onChange={(e) => setAddress(e.target.value)}
          />
          {/* <select
            className={classes.input}
            onChange={(e) => setAppointedDoc(e.target.value)}
          >
            <option value={null}>Select Doctor</option>
            {doctors.map((doc) => (
              <option
                value={doc._id}
              >{`${doc.first_name} ${doc.last_name}(${doc.specialization})`}</option>
            ))}
          </select> */}
        </div>
        {update ? null : (
          <div className={classes.groupInput}>
            {" "}
            <input
              placeholder="Password"
              value={password}
              required
              type="password"
              className={classes.input}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              placeholder="Confirm Password"
              value={confirmPass}
              required
              type="password"
              className={classes.input}
              onChange={(e) => setConfirmPass(e.target.value)}
            />
          </div>
        )}
        <input
          type="file"
          required
          placeholder="Profile Image"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <br />
    {localStorage.getItem("role")==="admin"?null: <div className="row align-items-baseline mt-3 ml-3">
          {" "}
          <input
            type="checkbox"
            style={{ cursor: "pointer", paddingTop: "30px" }}
            id="vh"
            required
            style={{
              height: "20px",
              width: "20px",
              marginRight: "10px",
              marginTop: "10px",
            }}
            name="vehicle1"
            value="Bike"
          />
          <label
            style={{ fontWeight: "500", color: "#fff", cursor: "pointer" }}
            for="vh"
          >
            I approve my data to be processed
          </label>
        </div>}
        <br />
        <br />
        {/* <div className={classes.groupInput}>
          {" "}

          <div className={classes.input} style={{ border: "none" }} />
        </div> */}
        <button type="submit" className={classes.submit}>
          Submit
        </button>
      </form>
    </div>
 </> );
};

export default withRouter(AddPatient);
