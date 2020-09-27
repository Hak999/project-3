import React, { useEffect, useState } from "react";
import classes from "./style.module.css";
import Axios from "axios";
import Navbar from "../navbar";
const DepDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    Axios.post(`${process.env.REACT_APP_BASE_URL}/doctorsByDep`, {
      id: window.location.pathname.split("/")[2],
    })
      .then((res) => {
        console.log(res);
        setLoading(false);
        return setDoctors([...res.data.data]);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <h1>Loading ...</h1>;
  }
  if (doctors.length < 1) {
    return <h1>No Doctor Found</h1>;
  }
  return (
    <>
      <Navbar />
      <div className={classes.doctorBG}>
      <div className={classes.wrapper}>
        {doctors.map((doc) => (
          <div key={doc._id} className={classes.card}>
            <img
              className={classes.image}
              src={`${process.env.REACT_APP_IMAGE_URL}/${doc.image}`}
              alt={doc.image}
            />
            <h2>{`${doc.first_name.toUpperCase()} ${doc.last_name.toUpperCase()}`}</h2>
            <br />
            <h5>Contact Number </h5> <p>{doc.mobile_number}</p>
            <h5>Address </h5> <p>{doc.address}</p>
            <br />
          </div>
        ))}
      </div>
      </div>
    </>
  );
};

export default DepDoctor;
