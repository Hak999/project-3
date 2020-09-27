import React, { useEffect, useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import classes from "./style.module.css";

import { Link, withRouter } from "react-router-dom";
import Home from "../HomeWrapper";
import moment from "moment";

const BedTab = ({ props }) => {
  const [beds, setBeds] = useState([]);

  const onDelete = (id) => {
    console.log("our id is :", id);
    Axios.delete(`${process.env.REACT_APP_BASE_URL}/deletePatient/${id}`)
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
  const onUpdate = (bed) => {
    if (bed.status) {
      Axios.put(`${process.env.REACT_APP_BASE_URL}/updateBed`, {
        id: bed._id,
        patient: [],
        allotDate: null,
        status: false,
      })
        .then((response) => {
          console.log("data", response);
          window.location.reload();
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
      localStorage.setItem("updateBed", JSON.stringify(bed));
      props.history.push(`/allotment-bed/${props.match.params.id}`);
    }
  };
  const AddBedClick = () => {
    localStorage.removeItem("updateBed");
  };
  useEffect(() => {
    console.log("match", props.match.params.id);
    Axios.get(
      `${process.env.REACT_APP_BASE_URL}/getBeds/${props.match.params.id}`
    )
      .then((response) => {
        console.log("data", response);
        setBeds([...response.data.data]);
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
    <>
      <h1 style={{ textAlign: "center" }}>
        Room {localStorage.getItem("roomNumber")}
      </h1>
      <Link
        to={`/allotment-bed/${props.match.params.id}`}
        onClick={AddBedClick}
      >
        <button className={[classes.button, classes.buttonAdd].join(" ")}>
          Add Bed
        </button>
      </Link>
      {beds.length > 0 ? (
        <table className={classes.table}>
          <thead>
            <tr>
              <th className={classes.paddingLeft}></th>
              <th>Room Number</th>
              <th>Patient Name</th>
              <th>Mobile Number</th>
              <th>symptoms</th>
              <th>Bed Number</th>
              <th>Allotment Date</th>
              <th>Update</th>
              {/* <th>Delete</th> */}
            </tr>
          </thead>
          <tbody>
            {beds.map((bed) => (
              <tr key={bed._id}>
                <td className={classes.paddingLeft}></td>
                <td>{bed.room[0].roomNumber}</td>
                <td>
                  <Link
                    to={bed.status ? `/patient/${bed.patient[0]._id}` : "#"}
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    {bed.status
                      ? `${bed.patient[0].first_name} ${bed.patient[0].last_name}`
                      : "--"}{" "}
                  </Link>{" "}
                </td>
                <td>{bed.status ? bed.patient[0].mobile_number : "--"}</td>
                <td>{bed.status ? bed.patient[0].symptoms : "--"}</td>
                <td>{bed.bedNumber}</td>
                <td>
                  {bed.status
                    ? moment(bed.allotDate).format("ddd MMM DD YYYY")
                    : "--"}
                </td>

                <td>
                  <button
                    className={
                      bed.status
                        ? [classes.button, classes.updateButton].join(" ")
                        : [classes.button, classes.deleteButton].join(" ")
                    }
                    onClick={() => onUpdate(bed)}
                  >
                    {bed.status ? "Vacant" : "Book"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h4 style={{ textAlign: "center" }}>No Beds Found Yet</h4>
      )}
    </>
  );
};

const BedTable = (props) => {
  if (props.disable) {
    // return <BedTab props={props} />;
  } else {
    return (
      <Home>
        <br />
        <BedTab props={props} />
      </Home>
    );
  }
};

export default withRouter(BedTable);
