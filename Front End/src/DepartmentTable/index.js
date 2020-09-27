import React, { useEffect, useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import classes from "./style.module.css";
import { Link, withRouter } from "react-router-dom";
import Home from "../HomeWrapper";

const DepartmentTable = (props) => {
  const [departments,setDepartments]=useState([]);

  const onDelete = (id) => {
    console.log("our id is :", id);
    Axios.delete(`${process.env.REACT_APP_BASE_URL}/deleteDepartment/${id}`)
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
  const onUpdate = (department) => {
    localStorage.setItem("updateDepartment", JSON.stringify(department));
    props.history.push("/add-departments");
  };
  const AddPatientClick = () => {
    localStorage.removeItem("updatePatient");
  };
  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_BASE_URL}/getAllDepartments`)
      .then((response) => {
        console.log("data", response);

        setDepartments([...response.data.data]);
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
    <Home>
      <br />
      <h1 style={{textAlign:"center"}}>Department Section</h1>
      <Link to="/add-departments" onClick={AddPatientClick}>
        {" "}
        <button className={[classes.button, classes.buttonAdd].join(" ")}>
          Add Department
        </button>
      </Link>
      <table className={classes.table}>
        <thead>
          <tr>
            <th className={classes.paddingLeft}></th>
            <th>Name</th>
            <th>Description</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dep) => (
            <tr key={dep._id}>
              <td className={classes.paddingLeft}></td>
          <td>{dep.name}</td>
              <td>{dep.description}</td>
              <td>
                <button
                  className={[classes.button, classes.updateButton].join(" ")}
                  onClick={() => onUpdate(dep)}
                >
                  Update
                </button>
              </td>
              <td>
                <button
                  onClick={() => onDelete(dep._id)}
                  className={[classes.button, classes.deleteButton].join(" ")}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Home>
  );
};

export default withRouter(DepartmentTable);
