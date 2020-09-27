import React, { useState, useEffect } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import classes from "./style.module.css";
import { withRouter } from "react-router-dom";
import Home from "../HomeWrapper";
const AddRoom = (props) => {
  const [roomNumber,setRoomNumber]=useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    Axios({
        method: 'POST',
        url: `${process.env.REACT_APP_BASE_URL}/addRoom`,
        headers:  {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          // authorization: TOKEN
        },
      data :{roomNumber:roomNumber}
      }).then((response) => {

          Swal.fire("Success", "Room Added Successfully", "success");
          props.history.push("/rooms");
        })
        .catch((e) => {
          Swal.fire(
            "error",
            `${e.response.data.message}`.toLocaleUpperCase(),
            "error"
          )
        });
  };
  return (
    <Home>
        <br />
        <br />
    <h1 style={{textAlign:"center"}}>Add Room</h1>
    <div className={classes.Wrapper}>
      {/* <div className={classes.header}>
        <h1>Add/Edit Patient</h1>
      </div> */}
      <form onSubmit={onSubmit}>
        <div className={classes.groupInput}>
          {" "}
          <input
            placeholder="Room Number"
            value={roomNumber}
            required
            className={classes.input}
            onChange={(e) => setRoomNumber(e.target.value)}
          />

          </div>
        <button type="submit" className={classes.submit}>
          Submit
        </button>
      </form>
    </div>
  </Home>);
};

export default withRouter(AddRoom);
