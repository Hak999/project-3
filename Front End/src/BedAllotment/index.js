import React, { useEffect, useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import classes from "./style.module.css";
import { withRouter } from "react-router-dom";
import Home from "../HomeWrapper";
import NurseWrapper from "../NurseWrapper";

const BedAllot = ({ props }) => {
  const [patients, setPatients] = useState([]);
  const [date, setDate] = useState(Date.now());
  const [patID, setPatID] = useState("");
  const [bedNumber, setBedNumber] = useState("");
  const [updateBed, setUpdateBed] = useState({});
  useEffect(() => {
    setUpdateBed(JSON.parse(localStorage.getItem("updateBed")));
    Axios.get(`${process.env.REACT_APP_BASE_URL}/getAllPatients`)
      .then((response) => {
        console.info("patient data", response);

        return setPatients([...response.data.data]);
      })
      .catch((e) => {
        Swal.fire(
          "error",
          `${e.response.data.message}`.toLocaleUpperCase(),
          "error"
        );
      });
  }, []);
  const AddAppoint = (e) => {
    e.preventDefault();
    if (!updateBed) {
      Axios.post(`${process.env.REACT_APP_BASE_URL}/addBed`, {
        patient: patID,
        allotDate: date,
        status: true,
        bedNumber: bedNumber,
        room: props.match.params.room,
      })
        .then((response) => {
          console.log("data", response);
          props.history.goBack();
          // if(localStorage.getItem("role")==="admin")
          // {
          //    props.history.push('/rooms');
          // }
          // else{

          //   props.history.push('/Nurse-Dashboard');

          // }
        })
        .catch((e) => {
          if (e.response) {
            Swal.fire(
              "error",
              `${e.response.data.message}`.toLocaleUpperCase(),
              "error"
            );
          }
        });
    } else {
      Axios.put(`${process.env.REACT_APP_BASE_URL}/updateBed`, {
        id: updateBed._id,
        patient: patID,
        allotDate: date,
        status: true,
      })
        .then((response) => {
          console.log("data", response);
          props.history.goBack();
        })
        .catch((e) => {
          if (e.response) {
            Swal.fire(
              "error",
              `${e.response.data.message}`.toLocaleUpperCase(),
              "error"
            );
          }
        });
    }
  };
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Bed Allotment</h1>
      <form onSubmit={AddAppoint}>
        <div className={classes.groupInput}>
          <select
            onChange={(e) => setPatID(e.target.value)}
            required
            className={classes.input}
          >
            <option value={null}>Select Patient</option>
            {patients.map((pat) => (
              <option
                value={pat._id}
              >{`${pat.first_name}(${pat.symptoms})`}</option>
            ))}
          </select>
        </div>
        <div className={classes.groupInput}>
          <input
            type='date'
            required
            value={date}
            className={classes.input}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className={classes.groupInput}>
          {updateBed ? null : (
            <input
              type='string'
              required
              readOnly={updateBed}
              placeholder='Bed Number'
              value={bedNumber}
              className={classes.input}
              onChange={(e) => setBedNumber(e.target.value)}
            />
          )}
        </div>
        <button type='submit' className={classes.submit}>
          Submit
        </button>
      </form>
    </>
  );
};

const BedAllotment = (props) => {
  if (localStorage.getItem("role") === "nurse") {
    return (
      <NurseWrapper>
        {" "}
        <BedAllot props={props} />
      </NurseWrapper>
    );
  } else {
    return (
      <Home>
        <br />
        <BedAllot props={props} />
      </Home>
    );
  }
};

export default withRouter(BedAllotment);
