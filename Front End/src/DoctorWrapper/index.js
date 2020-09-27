import React, { useState, useEffect } from "react";
import classes from "./style.module.css";
import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faColumns,
  faUserMd,
  faUserInjured,
  faCalendarPlus,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
const DoctorWrapper = (props) => {
  const [personal, setPersonal] = useState({});
  useEffect(() => {
    setPersonal(JSON.parse(localStorage.getItem("person")));
  }, []);
  const Logout = () => {
    localStorage.clear();
    props.history.push("/");
  };
  return (
    <>
      <div className={classes.MainWrapper}>
        <div className={classes.sideBar}>
          <img src={require("../Resources/0c5694.png")} alt='logo' />
          <div className={classes.imageWrapper}>
            {" "}
            <img
              src={`${process.env.REACT_APP_IMAGE_URL}/${personal.image}`}
              alt='profile'
              className={classes.image}
            />
          </div>
          <h2>{`${personal.first_name} ${personal.last_name}`}</h2>
          <h6>Doctor</h6>
          <div className={classes.wrapper}>
            <Link to='/Doctor-Dashboard' className={classes.links}>
              {" "}
              <div>
                {" "}
                <FontAwesomeIcon className='mr-3' icon={faColumns} />
                Dashboard
              </div>
            </Link>
            <Link to='/doctors-patients' className={classes.links}>
              {" "}
              <div>
                {" "}
                <FontAwesomeIcon className='mr-3' icon={faColumns} />
                Patients
              </div>
            </Link>
            <Link className={classes.links} to='/doctors-appointments'>
              {" "}
              <div>
                {" "}
                <FontAwesomeIcon className='mr-3' icon={faUserInjured} />
                View Appointments
              </div>
              <div className={classes.div} onClick={Logout}>
                <FontAwesomeIcon className='mr-3' icon={faSignOutAlt} />
                SignOut
              </div>
            </Link>
          </div>
        </div>
        <div className={classes.dashboard}>
          <div>{props.children}</div>
        </div>
      </div>
    </>
  );
};

export default withRouter(DoctorWrapper);
