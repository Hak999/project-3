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
import RoomTable from "../RoomTable1";
const NurseDashboard = (props) => {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    // Axios.get(`${process.env.REACT_APP_BASE_URL}/getPatAppointments/${localStorage.getItem('id')}`)
    //   .then((response) => {
    //     console.log("data", response);
    //     setRooms([...response.data.data]);
    //   })
    //   .catch((e) => {
    //     Swal.fire(
    //       "error",
    //       `${e.response.data.message}`.toLocaleUpperCase(),
    //       "error"
    //     );
    //   });
  }, []);
  return (
    <NurseWrapper>
      <RoomTable disable={true} />
    </NurseWrapper>
  );
};

export default withRouter(NurseDashboard);
