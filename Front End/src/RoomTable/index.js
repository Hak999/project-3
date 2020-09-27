import React, { useEffect, useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import classes from "./style.module.css";
import { Link, withRouter } from "react-router-dom";
import Home from "../HomeWrapper";
import moment from "moment";

const RoomTab = ({ props }) => {
  const [rooms, setRooms] = useState([]);
  const onClick = (id, roomNumber) => {
    localStorage.setItem("roomNumber", roomNumber);
    props.history.push(`/beds/${id}`);
  };
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
  const onUpdate = (room) => {
    if (room.status) {
      Axios.put(`${process.env.REACT_APP_BASE_URL}/updateRoom`, {
        id: room._id,
        patient: [],
        date: null,
        status: false,
        roomNumber: room.roomNumber,
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
      localStorage.setItem("updateRoom", JSON.stringify(room));
      props.history.push("/allotment-room");
    }
  };
  const AddPatientClick = () => {
    localStorage.removeItem("updatePatient");
  };
  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_BASE_URL}/getAllRooms`)
      .then((response) => {
        console.log("data", response);

        setRooms([...response.data.data]);
        Axios.get(`${process.env.REACT_APP_BASE_URL}/getBeds`)
          .then((res) => console.log("res", res))
          .catch((e) => console.log(e));
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
      <h1 style={{ textAlign: "center" }}>Rooms Section</h1>
      <Link to='/add-room' onClick={AddPatientClick}>
        {" "}
        <button className={[classes.button, classes.buttonAdd].join(" ")}>
          Add Room
        </button>
      </Link>
      <table className={classes.table}>
        <thead>
          <tr>
            <th className={classes.paddingLeft}></th>
            <th>Room Number</th>
            {/* <th>Update</th> */}
            {/* <th>Delete</th> */}
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr
              style={{ cursor: "pointer" }}
              key={room._id}
              onClick={() => onClick(room._id, room.roomNumber)}
            >
              <td className={classes.paddingLeft}></td>
              <td>{room.roomNumber}</td>
              {/* <td>{room.status ? "Booked" : "Available"}</td>
              <td>
                {room.patient.length > 0
                  ? `${room.patient[0].first_name} ${room.patient[0].last_name}`
                  : ""}
              </td>
              <td>
                {room.patient.length > 0 ? room.patient[0].mobile_number : ""}
              </td>
              <td>
                {room.date && moment(room.date).format("ddd MMM DD YYYY")}
              </td>
              <td>
                <button
                  className={
                    room.status
                      ? [classes.button, classes.updateButton].join(" ")
                      : [classes.button, classes.deleteButton].join(" ")
                  }
                  onClick={() => onUpdate(room)}
                >
                  {room.status ? "Vacant Me" : "Book Me"}
                </button>
              </td> */}
              {/* <td>
                <button
                  onClick={() => onDelete(room._id)}
                  className={[classes.button, classes.deleteButton].join(" ")}
                >
                  Delete
                </button>
              </td>
            */}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

const RoomTable = (props) => {
  if (props.disable) {
    return <RoomTab props={props} />;
  } else {
    return (
      <Home>
        <br />
        <RoomTab props={props} />
      </Home>
    );
  }
};

export default withRouter(RoomTable);
