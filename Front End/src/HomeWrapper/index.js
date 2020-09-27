import React, { useEffect, useState } from "react";
import classes from "./style.module.css";
import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faColumns,
  faUserMd,
  faUserInjured,
  faCalendarPlus,
  faBed,
  faHospitalUser,
  faSignOutAlt,
  faUserNurse
} from "@fortawesome/free-solid-svg-icons";
const Home = (props) => {
  const [personal, setPersonal] = useState({});
  useEffect(() => {
    setPersonal(JSON.parse(localStorage.getItem("person")));
  }, []);
  const Logout = () => {
    localStorage.clear();
    props.history.push("/");
  };
  return (
    <div className={classes.MainWrapper}>
      <div className={classes.sideBar}>
      <img src={require("./Resources/0c5694.png")} alt="logo" />
        <div className={classes.imageWrapper}>
          {" "}
          <img
            src={`${process.env.REACT_APP_IMAGE_URL}/${personal.image}`}
            alt="profile"
            className={classes.image}
          />
        </div>
        <h2>{`${personal.first_name} ${personal.last_name}`}</h2>
        <h6>Admin</h6>
        <div className={classes.wrapper}>
          <Link className={classes.links} to="/Admin-Dashboard">
            {" "}
            <div>
              {" "}
              <FontAwesomeIcon className="mr-3" icon={faColumns} />
              Dashboard
            </div>
          </Link>
          <Link className={classes.links} to="/doctors">
            {" "}
            <div>
              {" "}
              <FontAwesomeIcon className="mr-3" icon={faUserMd} />
              Doctor
            </div>
          </Link>
          <Link className={classes.links} to="/patients">
            {" "}
            <div>
              {" "}
              <FontAwesomeIcon className="mr-3" icon={faUserInjured} />
              Patient
            </div>
          </Link>
          <Link className={classes.links} to="/admin-nurses">
            {" "}
            <div>
              {" "}
              <FontAwesomeIcon className="mr-3" icon={faUserNurse} />
              Nurses
            </div>
          </Link>

          <Link to="/all-appointments" className={classes.links}>
            {" "}
            <div>
              {" "}
              <FontAwesomeIcon className="mr-3" icon={faCalendarPlus} />
              Appointment
            </div>{" "}
          </Link>
          <Link to="/rooms" className={classes.links}>
            {" "}
            <div>
              {" "}
              <FontAwesomeIcon className="mr-3" icon={faBed} />
              Rooms
            </div>{" "}
          </Link>
          <Link to="/admin-departments" className={classes.links}>
            {" "}
            <div>
              {" "}
              <FontAwesomeIcon className="mr-3" icon={faHospitalUser} />
              Departments
            </div>{" "}
            <div className={classes.div} onClick={Logout}> {" "}
              <FontAwesomeIcon className="mr-3" icon={faSignOutAlt}/>
              Sign Out
            </div>{" "}
          </Link>
        </div>
      </div>
      <div className={classes.dashboard}>
        <div>{props.children}</div>
      </div>
    </div>
  );
};

export default withRouter(Home);
