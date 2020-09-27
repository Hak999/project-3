import React, { useState, useEffect } from "react";
import classes from "./style.module.css";
import Axios from "axios";
import Swal from "sweetalert2";
const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [endPoint, setEndPoint] = useState("loginAdmin");

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "doctor") {
      setEndPoint("loginDoctor");
    } else if (role === "patient") {
      setEndPoint("loginPatient");
    } else {
      return;
    }
  }, []);
  const Signin = (e) => {
    e.preventDefault();
    console.log("i am in signin ");
    Axios.post(`${process.env.REACT_APP_BASE_URL}/${endPoint}`, {
      email: email,
      password: password,
    })
      .then((response) => {
        Swal.fire(
          "Success",
          "Welcome",
          "success"
        );
        console.log(response);
        localStorage.setItem("token", response.data.webToken);
        localStorage.setItem("id",response.data.id);
        const role = localStorage.getItem("role");
        if (role === "doctor") {
          props.history.push("/Doctor-Dashboard");
        } else if (role === "patient") {
          props.history.push("/Patient-Dashboard");
        } else {
          props.history.push("/Admin-Dashboard");
        }
      })
      .catch((e) => {
        Swal.fire(
          "error",
          `${e.response.data.message}`.toLocaleUpperCase(),
          "error"
        );
      });
  };
  return (
    <div className={classes.SigninWrapper}>
      <div className={classes.signInBox}>
        <h2>Admin Signin</h2>
        <form onSubmit={Signin}>
          <div className={classes.input}>
            <input
              placeholder="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={classes.input}>
            <input
              placeholder="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className={classes.button} type="submit">
            SignIn
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
