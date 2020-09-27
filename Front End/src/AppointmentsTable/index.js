import React, { useEffect, useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import classes from "./style.module.css";
import { Link, withRouter } from "react-router-dom";
import moment from "moment";
import Home from "../HomeWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowDown,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";
const AppointmentTable = (props) => {
  const [appointments, setAppointments] = useState([]);
  const [sort, setSort] = useState(false);
  const onUpdate = (appointment) => {
    localStorage.setItem("updateAppointment", JSON.stringify(appointment));
    props.history.push("/create-appointment");
  };
  const detailAppoint = (appointment) => {
    localStorage.setItem("updateAppointment", JSON.stringify(appointment));
    props.history.push("/detail-appointment");
  };
  const Sort = () => {
    const array1 = [...appointments];
    if (!sort) {
      const arr = array1.sort(function (a, b) {
        if (a.doctor[0].first_name < b.doctor[0].first_name) {
          return -1;
        }
        if (a.doctor[0].first_name > b.doctor[0].first_name) {
          return 1;
        }
        return 0;
      });
      console.log("sorted", arr);
      setSort(!sort);
      setAppointments([...arr]);
    } else {
      const arr = array1.sort(function (a, b) {
        if (a.doctor[0].first_name > b.doctor[0].first_name) {
          return -1;
        }
        if (a.doctor[0].first_name < b.doctor[0].first_name) {
          return 1;
        }
        return 0;
      });
      console.log("sorted", arr);
      setSort(!sort);

      setAppointments([...arr]);
    }
  };
  const onDelete = (id) => {
    console.log("i am in detail page");
    Axios.delete(`${process.env.REACT_APP_BASE_URL}/deleteAppointment/${id}`)
      .then((response) => {
        console.log("data", response);
        window.location.reload();
      })
      .catch((e) => {
        if (e.response.data) {
          Swal.fire(
            "error",
            `${e.response.data.message}`.toLocaleUpperCase(),
            "error"
          );
        }
      });
  };
  const AddDoctorClick = () => {
    localStorage.removeItem("updateAppointment");
  };
  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_BASE_URL}/getAllAppointments`)
      .then((response) => {
        console.log("data", response);
        if (response.data.data) {
          const data = response.data.data.sort(function (a, b) {
            var dateA = new Date(a.date),
              dateB = new Date(b.date);
            return dateA - dateB;
          });

          console.log("data after sort", data);
          setAppointments([...data]);
        }
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
  }, []);

  return (
    <Home>
      <br />
      <h1 style={{ textAlign: "center" }}>Appointment Section</h1>
      <Link to='/create-appointment' onClick={AddDoctorClick}>
        {" "}
        <button className={[classes.button, classes.buttonAdd].join(" ")}>
          create appointments
        </button>
      </Link>
      <table className={classes.table}>
        <thead>
          <tr>
            <th className={classes.paddingLeft} onClick={Sort}></th>
            <th>ID</th>
            <th>Doctor Name</th>
            <th onClick={Sort}>
              Patient Name{" "}
              {sort ? (
                <FontAwesomeIcon className={classes.Icons} icon={faSortDown} />
              ) : (
                <FontAwesomeIcon className={classes.Icons} icon={faSortUp} />
              )}
            </th>
            <th>Description</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Presc. Added</th>
            {/* <th>Update</th> */}
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length > 0
            ? appointments.map((appoint, id) =>
                appoint.doctor.length > 0 && appoint.patient.length > 0 ? (
                  <tr key={appoint._id}>
                    <td className={classes.paddingLeft}></td>
                    <td>{appoint.patient[0].patientId}</td>
                    <td
                      onClick={() => detailAppoint(appoint)}
                    >{`${appoint.doctor[0].first_name} ${appoint.doctor[0].last_name}`}</td>
                    <td
                      onClick={() => detailAppoint(appoint)}
                    >{`${appoint.patient[0].first_name} ${appoint.patient[0].last_name}`}</td>
                    <td onClick={() => detailAppoint(appoint)}>
                      {appoint.description}
                    </td>
                    <td onClick={() => detailAppoint(appoint)}>
                      {moment(appoint.date).format("ddd MMM DD YYYY")}
                    </td>
                    <td onClick={() => detailAppoint(appoint)}>
                      {appoint.time}
                    </td>
                    {/* <td>{moment(appoint.time, "H:MM A").format("HH:MM A")}</td> */}
                    <td onClick={() => detailAppoint(appoint)}>
                      {appoint.status}
                    </td>
                    <td onClick={() => detailAppoint(appoint)}>
                      {appoint.docCase ? "Yes" : "No"}
                    </td>
                    {/* <td>
                <button
                  className={[classes.button,classes.updateButton].join(' ')}
                  onClick={() => onUpdate(appoint)}
                >
                  Update
                </button>
              </td> */}
                    <td>
                      <button
                        className={[classes.button, classes.deleteButton].join(
                          " "
                        )}
                        onClick={() => onDelete(appoint._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ) : null
              )
            : null}
        </tbody>
      </table>
    </Home>
  );
};

export default withRouter(AppointmentTable);
