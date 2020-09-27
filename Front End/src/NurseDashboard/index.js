import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PatientWrapper from "../PatientWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";
import Swal from "sweetalert2";
import {
  faColumns,
  faUserMd,
  faUserInjured,
  faCalendarPlus,
} from "@fortawesome/free-solid-svg-icons";
import classes from "./style.module.css";
import DoctorWrapper from "../DoctorWrapper";
import NurseWrapper from "../NurseWrapper";
import NursesTable from "../NursesTable";
import RoomTable from "../RoomTable";
const NurseDashboard = (props) => {
  const [rooms, setRooms] = useState([]);
  const [patients, setPatients] = useState([]);
  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_BASE_URL}/GetNurseStats`)
      .then((response) => {
        console.log("data", response);
        setRooms([...response.data.data]);
        setPatients([...response.data.patients]);
      })
      .catch((e) => {
        Swal.fire(
          "error",
          `${e.response.data.message}`.toLocaleUpperCase(),
          "error"
        );
      });
  }, []);
  return (
    <NurseWrapper>
      <h1 className={classes.title}>Dashboard</h1>
      <div className={classes.blocksWrapper}>
        <div
          className={classes.dashBlock}
          onClick={() => props.history.push("/nurse-appointments")}
        >
          <div>
            <h1>{patients.length}</h1>
            <div>
              <b>View Patients</b>
            </div>
            {/* <div><b>Approval Requested</b> : 1</div> */}
          </div>

          <div className={classes.IconsWrapper}>
            {" "}
            <FontAwesomeIcon className={classes.Icons} icon={faUserMd} />
          </div>
        </div>
        <div
          className={classes.dashBlock}
          onClick={() => props.history.push("/nurse-rooms")}
        >
          <div>
            <h1>{rooms.length}</h1>
            <div>
              <b>View Rooms</b>
            </div>
            {/* <div><b>Approval Requested</b> : 1</div> */}
          </div>

          <div className={classes.IconsWrapper}>
            {" "}
            <FontAwesomeIcon className={classes.Icons} icon={faUserMd} />
          </div>
        </div>
        {/* <div className={[classes.dashBlock,classes.dashBlock1].join(' ')} onClick={()=>props.history.push("/get-appointment")} >
            <div>
                {/* <h1>1</h1> */}
        {/* <div><b>Create Appointment</b></div> */}
        {/* <div><b>Wants to Admit</b> : 1</div> */}
        {/* </div>
<div className={classes.IconsWrapper}> <FontAwesomeIcon className={classes.Icons} icon={faUserInjured} /></div>
        </div> */}
      </div>{" "}
    </NurseWrapper>
  );
};

export default withRouter(NurseDashboard);
