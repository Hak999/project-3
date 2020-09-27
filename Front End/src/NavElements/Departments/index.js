import React, { useEffect, useState } from "react";
import Axios from "axios";
import classes from "./style.module.css";
import Navbar from "../navbar";
import { withRouter } from "react-router-dom";

const PublicDepartments = (props) => {
  const [departments, setDepartments] = useState([]);
  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_BASE_URL}/getAllDepartments`)
      .then((res) => {
        console.log(res);
        return setDepartments([...res.data.data]);
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <>
      <Navbar />
      <div className={classes.departmentWrapper}>
        {departments &&
          departments.map((dep) => (
            <div
              key={dep._id}
              onClick={() => props.history.push(`/dep-doctor/${dep._id}`)}
              className={classes.department}
            >
              <h5 className={classes.heading}>{dep.name}</h5>
              <p>{dep.description}</p>
              <p className={classes.doctor}>Click to see the Doctors</p>
            </div>
          ))} 
      </div>
    </>
  );
};

export default withRouter(PublicDepartments);
