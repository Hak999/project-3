import React from "react";

import "./notfound.css";

const NotFound = ({ history = {} }) => {
  const handleRedirect = () => {
    // eslint-disable-line no-unused-vars
    const role = localStorage.getItem("role");
    if (localStorage.getItem("token")) {
      if (role === "doctor") {
        return history.push("/Doctor-Dashboard");
      }
      if (role === "patient") {
        return history.push("/Patient-Dashboard");
      }
      if (role === "nurse") {
        return history.push("/Nurse-Dashboard");
      }
      if (role === "admin") {
        return history.push("/Admin-Dashboard");
      }
    } else {
      history.push("/");
    }
  };

  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>
            4<span>0</span>4
          </h1>
        </div>
        <h2>the page you've requested could not found</h2>
        <button onClick={handleRedirect} className="btn btn-primary">
          Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
