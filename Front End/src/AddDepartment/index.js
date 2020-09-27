import React, { useState, useEffect } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import classes from "./style.module.css";
import { withRouter } from "react-router-dom";
import Home from "../HomeWrapper";
const AddDepartment = (props) => {
  const [update, setUpdate] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [desc,setDesc] = useState("");

  useEffect(() => {
    setUpdate(false);
    const department = JSON.parse(localStorage.getItem("updateDepartment"));
    if (department) {
      setUpdate(true);
      setId(department._id);
      setName(department.name);
      setDesc(department.description);
    }
  }, []);
  const onUpdate = () => {
    Axios.put(`${process.env.REACT_APP_BASE_URL}/updateDepartment`, {
      id: id,
      name,
      description:desc
    })
      .then((response) => {
        Swal.fire("Success", "Department Updated Successfully", "success");
        localStorage.removeItem("updateDepartment");
        props.history.push("/admin-departments");
      })
      .catch((e) => {
        Swal.fire(
          "error",
          `${e.response.data.message}`.toLocaleUpperCase(),
          "error"
        );
      });
  };
  const AddNurse = () => {
    Axios({
      method: "POST",
      url: `${process.env.REACT_APP_BASE_URL}/addDepartment`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // authorization: TOKEN
      },
      data:{name,description:desc},
    })
      .then((response) => {
        Swal.fire("Success", "Department Added Successfully", "success");
        props.history.push("/admin-departments");
      })
      .catch((e) => {
        Swal.fire(
          "error",
          `${e.response.data.message}`.toLocaleUpperCase(),
          "error"
        );
      });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (update) {
      onUpdate();
    } else {
      AddNurse();
    }
  };
  return (
    <Home>
      <br />
      <h1 style={{textAlign:"center"}}>Department Section</h1>
      <div className={classes.Wrapper}>
        {/* <div className={classes.header}>
        <h1>Add/Edit Patient</h1>
      </div> */}
        <form onSubmit={onSubmit}>
            {" "}
            <input
              placeholder="Department Name"
              value={name}
              className={classes.input}
              required
              onChange={(e) => setName(e.target.value)}
            />
            <textarea
              placeholder="Description"
              value={desc}
              required
              className={classes.input}
              style={{height:"100px"}}
              onChange={(e) => setDesc(e.target.value)}
            />
                    <br />
          <br />
          <button type="submit" className={classes.submit}>
            Submit
          </button>
        </form>
      </div>
    </Home>
  );
};

export default withRouter(AddDepartment);
