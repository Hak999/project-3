import React, { useState, useEffect } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import classes from "./style.module.css";
import { withRouter } from "react-router-dom";
import Home from "../HomeWrapper";
const AddNurse = (props) => {
  const [update, setUpdate] = useState(false);
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [mobile, setMobile] = useState("");
  const [image, setImage] = useState();
  const [address, setAddress] = useState("");
  useEffect(() => {
    setUpdate(false);
    Axios.get(`${process.env.REACT_APP_BASE_URL}/getAllDepartments`)
      .then((res) => {
        console.log(res);
        // setDepartments([...res.data.data]);
        //  return setDepartments([...res.data.data]);
      })
      .catch((e) => console.log(e));

    const nurse = JSON.parse(localStorage.getItem("updateNurse"));
    if (nurse) {
      setUpdate(true);
      setId(nurse._id);
      setEmail(nurse.email);
      setFirstName(nurse.first_name);
      setLastName(nurse.last_name);
      // setdepartment(nurse.department);
      setMobile(nurse.mobile_number);
      setAddress(nurse.address);
      setPassword(nurse.password);
    }
  }, []);
  const onUpdate = () => {
    Axios.put(`${process.env.REACT_APP_BASE_URL}/updateNurse`, {
      id: id,
      email: email,
      first_name: firstName,
      last_name: lastName,
      password: password,
      // department: department,
      mobile_number: mobile,
      address: address,
    })
      .then((response) => {
        Swal.fire("Success", "Nurse Added Successfully", "success");
        localStorage.removeItem("updateNurse");
        props.history.push("/admin-nurses");
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
    const data = new FormData();
    data.append("email", email);
    data.append("first_name", firstName);
    data.append("last_name", lastName);
    data.append("password", password);
    // data.append('department',department);
    data.append("mobile_number", mobile);
    data.append("address", address);
    data.append("profileImage", image);
    if(password!==confirmPass)
    {
      return  Swal.fire(
        "error",
        "Password and Confirm Password Should be Same",
        "error"
      );
    }
    Axios({
      method: "POST",
      url: `${process.env.REACT_APP_BASE_URL}/addNurse`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // authorization: TOKEN
      },
      data: data,
    })
      .then((response) => {
        Swal.fire("Success", "Nurse Added Successfully", "success");
        props.history.push("/admin-nurses");
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
      <h1 style={{textAlign:"center"}}>Add/Update Nurse</h1>
      <div className={classes.Wrapper}>
        {/* <div className={classes.header}>
        <h1>Add/Edit Patient</h1>
      </div> */}
        <form onSubmit={onSubmit}>
          <div className={classes.groupInput}>
            {" "}
            <input
              placeholder="Email"
              value={email}
              type="email"
              required
              className={classes.input}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="First Name"
              value={firstName}
              required
              className={classes.input}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className={classes.groupInput}>
            {" "}
            <input
              placeholder="Last Name"
              value={lastName}
              required
              className={classes.input}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              placeholder="Mobile Number"
              value={mobile}
              required
              className={classes.input}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
          {update ? null : (
            <div className={classes.groupInput}>
              {" "}
              <input
                placeholder="Password"
                value={password}
                type="password"
                required
                className={classes.input}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                placeholder="Confirm Password"
                value={confirmPass}
                type="password"
                required
                className={classes.input}
                onChange={(e) => setConfirmPass(e.target.value)}
              />
            </div>
          )}
          <div className={classes.groupInput}>
            <input
              placeholder="Address"
              value={address}
              required
              className={classes.input}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <input
            type="file"
            required
            placeholder="Profile Image"
            onChange={(e) => setImage(e.target.files[0])}
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

export default withRouter(AddNurse);
