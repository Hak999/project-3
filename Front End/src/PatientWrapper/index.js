import React, { useState, useEffect } from "react";
import classes from "./style.module.css";
import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faColumns,
    faUserMd,
    faUserInjured,
    faCalendarPlus,
    faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";
const PatientWrapper = (props) => {
  const [personal,setPersonal]=useState({});
  useEffect(()=>{
    setPersonal(JSON.parse(localStorage.getItem("person")));
  },[]);
  const Logout=()=>{
    localStorage.clear();
    props.history.push('/');
  }
  return (
    <>
      <div className={classes.MainWrapper}>
        <div className={classes.sideBar}>
        <img src={require("../Resources/0c5694.png")} alt="logo" />
        <div className={classes.imageWrapper}>
            {" "}
            <img
              src={`${process.env.REACT_APP_IMAGE_URL}/${personal.image}`}
              alt="profile"
              className={classes.image}
            />
          </div>
  <h2>{`${personal.first_name} ${personal.last_name}`}</h2>
          <h6>Patient</h6>
          <div className={classes.wrapper}>
            <Link to="/Patient-Dashboard" className={classes.links}>
              {" "}
              <div> <FontAwesomeIcon className="mr-3" icon={faColumns} />Dashboard</div>
            </Link>
            <Link className={classes.links} to="/my-appointments">
              {" "}
              <div> <FontAwesomeIcon className="mr-3" icon={faUserInjured} />View Appointments</div>
            </Link>
            <Link to="/get-appointment" className={classes.links}>
              {" "}
              <div>  <FontAwesomeIcon className="mr-3" icon={faCalendarPlus} />Create Appointment</div>{" "}
            </Link>
            <div className={classes.div}
                onClick={Logout}
                ><FontAwesomeIcon className="mr-3" icon={faSignOutAlt} />SignOut</div>
          </div>
        </div>
        <div className={classes.dashboard}>
            
         <div>{props.children}</div>
        </div>
      </div>
    </>
  );
};

export default withRouter(PatientWrapper);
