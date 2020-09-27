import React, { useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import "./Resources/style.css";
import { Link } from "react-router-dom";
import Navbar from "./navbar";

const Login = (props) => {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [endPoint, setEndPoint] = useState("loginAdmin");
  const LoginVar = (e) => {
    localStorage.setItem("role", e.target.value);
    setRole(e.target.value);
    if (e.target.value === "doctor") {
      setEndPoint("loginDoctor");
    } else if (e.target.value === "patient") {
      setEndPoint("loginPatient");
    } else if (e.target.value === "nurse") {
      setEndPoint("loginNurse");
    } else return;
  };
  const Signin = (e) => {
    e.preventDefault();
    if (role === "") {
      return Swal.fire("error", `Please Select a Role First`, "error");
    }
    console.log("i am in signin ");
    Axios.post(`${process.env.REACT_APP_BASE_URL}/${endPoint}`, {
      email: email,
      password: password,
    })
      .then((response) => {
        Swal.fire("Success", "Welcome", "success");
        console.log(response);
        localStorage.setItem("token", response.data.webToken);
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("person", JSON.stringify(response.data.person));
        const role = localStorage.getItem("role");
        if (role === "doctor") {
          props.history.push("/Doctor-Dashboard");
        } else if (role === "patient") {
          props.history.push("/Patient-Dashboard");
        } else if (role === "nurse") {
          props.history.push("/Nurse-Dashboard");
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
    <>
      <Navbar />
      <div class='background' style={{ marginTop: "117px" }}>
        <div
          class='sign-in col-md-3 login-form-2 '
          style={{ marginTop: "-70px" }}
        >
          <h3 class='pb-4 text-white '>
            Welcome! Please login into your account
          </h3>
          <form onSubmit={Signin}>
            <select class='form-control mb-3' onChange={LoginVar}>
              <option value=''>Account Type</option>
              <option value='admin'>Admin</option>
              <option value='doctor'>Doctor</option>
              <option value='patient'>Patient</option>
              <option value='nurse'>Nurse</option>
              {/* <option>Nurse</option> */}
            </select>
            <div class='form-group '>
              <input
                type='email'
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                class='form-control '
                placeholder='Email'
              />
            </div>
            <div class='form-group '>
              <input
                type='password'
                password={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                class='form-control '
                placeholder='Password'
                value={password}
              />
            </div>
            <div class='form-group '>
              <button type='submit ' class='btnSubmit text-center '>
                Sign In
              </button>
            </div>
            <Link to='/signup' class='ForgetPwd text-white '>
              Don't have an Account ?
            </Link>
            {/* <a href="# " class="ForgetPwd text-white " value="Login ">Forgot Password?</a> */}
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
