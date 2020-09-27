import React, { useEffect, useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import classes from "./style.module.css";
import { Link, withRouter } from "react-router-dom";
import Home from "../HomeWrapper";
class DoctorTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doctors: [],
      isSearching: false,
      keyWord: "",
      searchedDoctors: [],
    };
    this.handleSearchedDoctors = this.handleSearchedDoctors.bind(this);
  }
  handleSearchedDoctors = (e) => {
    console.log(e.target.value);
    const keyWord = e.target.value;
    console.log(keyWord);
    this.setState({
      keyWord,
    });
    if (keyWord == "") {
      this.setState({
        isSearching: false,
      });
    } else {
      this.setState({
        isSearching: true,
      });
      var foundValue = this.state.doctors.filter(
        (obj) => obj.first_name.match(keyWord) || obj.last_name.match(keyWord)
      );

      this.setState({
        searchedDoctors: foundValue,
      });
    }
  };
  componentDidMount() {
    var array = [
      { name: "string 1", value: "this", other: "that" },
      { name: "string 2", value: "this", other: "that" },
    ];

    var foundValue = array.filter((obj) => obj.name.match("string"));

    console.log("found", foundValue);
    Axios.get(`${process.env.REACT_APP_BASE_URL}/getAllDoctors`)
      .then((response) => {
        console.log("data", response);
        this.setState({
          doctors: response.data.data,
        });
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
  }
  AddDoctorClick = () => {
    localStorage.removeItem("updateDoctor");
  };
  onUpdate = (doctor) => {
    localStorage.setItem("updateDoctor", JSON.stringify(doctor));
    this.props.history.push("/Admin-Doc");
  };
  onDelete = (id) => {
    Axios.delete(`${process.env.REACT_APP_BASE_URL}/deleteDoctor/${id}`)
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
  render() {
    const { doctors, isSearching, searchedDoctors } = this.state;
    return (
      <Home>
        <br />
        <h1 style={{ textAlign: "center" }}>Doctor Section</h1>

        <Link to='/Admin-Doc' onClick={this.AddDoctorClick}>
          {" "}
          <button className={[classes.button, classes.buttonAdd].join(" ")}>
            Add Doctor
          </button>
        </Link>
        <input
          type='text'
          className='form-control-sm float-right'
          placeholder='Search Doctor'
          value={this.state.keyWord}
          onChange={this.handleSearchedDoctors}
        />
        <table className={classes.table} style={{ width: "100%" }}>
          <thead>
            <tr>
              <th className={classes.paddingLeft}></th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Address</th>
              <th>Department</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {isSearching
              ? searchedDoctors &&
                searchedDoctors.map((doctor) => (
                  <tr key={doctor._id}>
                    <td className={classes.paddingLeft}></td>
                    <td>{`${doctor.first_name} ${doctor.last_name}`}</td>
                    <td>{doctor.mobile_number}</td>
                    <td>{doctor.address}</td>
                    <td>
                      {doctor.department.length > 0
                        ? doctor.department[0].name
                        : "--"}
                    </td>
                    <td>
                      <button
                        className={[classes.button, classes.updateButton].join(
                          " "
                        )}
                        onClick={() => this.onUpdate(doctor)}
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      <button
                        className={[classes.button, classes.deleteButton].join(
                          " "
                        )}
                        onClick={() => this.onDelete(doctor._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              : doctors &&
                doctors.map((doctor) => (
                  <tr key={doctor._id}>
                    <td className={classes.paddingLeft}></td>
                    <td>{`${doctor.first_name} ${doctor.last_name}`}</td>
                    <td>{doctor.mobile_number}</td>
                    <td>{doctor.address}</td>
                    <td>
                      {doctor.department.length > 0
                        ? doctor.department[0].name
                        : "--"}
                    </td>
                    <td>
                      <button
                        className={[classes.button, classes.updateButton].join(
                          " "
                        )}
                        onClick={() => this.onUpdate(doctor)}
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      <button
                        className={[classes.button, classes.deleteButton].join(
                          " "
                        )}
                        onClick={() => this.onDelete(doctor._id)}
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
  }
}

export default withRouter(DoctorTable);
