import React, { useEffect, useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import classes from "./style.module.css";
import { withRouter } from "react-router-dom";

const CreateAppointment = (props) => {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState(Date.now());
  const [time, setTime] = useState("");
  const [patID, setPatID] = useState("");
  const [docID, setDocID] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
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
    Axios.get(`${process.env.REACT_APP_BASE_URL}/getAllPatients`)
      .then((response) => {
        console.log("data", response);
        if (localStorage.getItem("role") === "patient") {
          console.log("hi i am in filter");
          const filter = response.data.data.filter(
            (pat) => pat._id === localStorage.getItem("id")
          );
          setPatients([...filter]);
          setPatID(filter[0]._id);
          console.log("our filtered array", filter);
          return;
        }
        setPatients([...response.data.data]);
      })
      .catch((e) => {
        Swal.fire(
          "error",
          `${e.response.data.message}`.toLocaleUpperCase(),
          "error"
        );
      });
  }, []);
  console.log("our time is ::", time);
  const AddAppoint = (e) => {
    e.preventDefault();
    setLoading(true);
    Axios.post(`${process.env.REACT_APP_BASE_URL}/addAppointment`, {
      doctor: docID,
      patient: patID,
      date: date,
      time: time,
      description: desc,
      status: "confirm",
    })
      .then((response) => {
        console.log("data", response);
        setLoading(false);
        if (localStorage.getItem("role") === "patient") {
          console.log("i am patient");
          props.history.push("/my-appointments");
        } else {
          props.history.push("/all-appointments");
        }
      })
      .catch((e) => {
        setLoading(false);

        if (e.response) {
          Swal.fire(
            "error",
            `${e.response.data.message}`.toLocaleUpperCase(),
            "error"
          );
        }
      });
  };
  if (loading) {
    return <h1>Loading ...</h1>;
  }
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Create Appointment</h1>
      <form onSubmit={AddAppoint}>
        <div className={classes.groupInput}>
          <select
            className={classes.input}
            onChange={(e) => setDocID(e.target.value)}
            required
          >
            <option value={null}>Select Doctor</option>
            {doctors.map((doc) => (
              <option
                value={doc._id}
              >{`${doc.first_name} ${doc.last_name}(${doc.department[0].name})`}</option>
            ))}
          </select>
          {localStorage.getItem("role") === "patient" ? null : (
            <select
              required
              onChange={(e) => setPatID(e.target.value)}
              className={classes.input}
            >
              <option value={null}>Select Patient</option>
              {patients.map((pat) => (
                <option
                  value={pat._id}
                >{`${pat.first_name}(${pat.symptoms})`}</option>
              ))}
            </select>
          )}
        </div>
        <div className={classes.groupInput}>
          <textarea
            value={desc}
            required
            placeholder="Description"
            className={classes.textarea}
            onChange={(e) => setDesc(e.target.value)}
          />
          <input
            type="date"
            value={date}
            required
            className={classes.input1}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            type="time"
            required
            value={time}
            className={classes.input1}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <button type="submit" className={classes.submit}>
          Submit
        </button>
      </form>
    </>
  );
};

export default withRouter(CreateAppointment);
