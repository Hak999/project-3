import React, { useEffect, useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import classes from "./style.module.css";
import { Link, withRouter } from "react-router-dom";
import Home from "../HomeWrapper";
class PatientTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      patients: [],
      isSearching: false,
      keyWord: "",
      searchedPatients: [],
    };
    this.handleSearchedPatients = this.handleSearchedPatients.bind(this);
  }

  handleSearchedPatients = (e) => {
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
      var foundValue = this.state.patients.filter(
        (obj) => obj.first_name.match(keyWord) || obj.last_name.match(keyWord)
      );

      this.setState({
        searchedPatients: foundValue,
      });
    }
  };
  AddPatientClick = () => {
    localStorage.removeItem("updatePatient");
  };
  onDelete = (id) => {
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
  onUpdate = (patient) => {
    localStorage.setItem("updatePatient", JSON.stringify(patient));
    this.props.history.push("/Admin-Pat");
  };
  componentDidMount() {
    Axios.get(`${process.env.REACT_APP_BASE_URL}/getAllPatients`)
      .then((response) => {
        console.log("data", response);
        this.setState({
          patients: response.data.data,
        });
      })
      .catch((e) => {
        Swal.fire(
          "error",
          `${e.response.data.message}`.toLocaleUpperCase(),
          "error"
        );
      });
  }
  render() {
    const { patients, isSearching, searchedPatients } = this.state;
    return (
      <Home>
        <br />
        <h1 style={{ textAlign: "center" }}>Patients Section</h1>
        <Link to='/Admin-Pat' onClick={this.AddPatientClick}>
          {" "}
          <button className={[classes.button, classes.buttonAdd].join(" ")}>
            Add Patient
          </button>
        </Link>
        <input
          type='text'
          className='form-control-sm float-right'
          placeholder='Search Patient'
          value={this.state.keyWord}
          onChange={this.handleSearchedPatients}
        />
        <table className={classes.table} style={{ width: "100%" }}>
          <thead>
            <tr>
              <th className={classes.paddingLeft}></th>
              <th>ID</th>
              <th>Name</th>
              <th>Symptoms</th>
              <th>Mobile</th>
              <th>Address</th>
              <th>Appointment Status</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {isSearching
              ? searchedPatients.map((patient, id) => (
                  <tr key={patient._id}>
                    <td className={classes.paddingLeft}></td>
                    <td>{patient.patientId}</td>
                    <td>{`${patient.first_name} ${patient.last_name}`}</td>
                    <td>{patient.symptoms}</td>
                    <td>{patient.mobile_number}</td>
                    <td>{patient.address}</td>
                    <td>{patient.appointment_status}</td>
                    <td>
                      <button
                        className={[classes.button, classes.updateButton].join(
                          " "
                        )}
                        onClick={() => this.onUpdate(patient)}
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => this.onDelete(patient._id)}
                        className={[classes.button, classes.deleteButton].join(
                          " "
                        )}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              : patients.map((patient, id) => (
                  <tr key={patient._id}>
                    <td className={classes.paddingLeft}></td>
                    <td>{patient.patientId}</td>
                    <td>{`${patient.first_name} ${patient.last_name}`}</td>
                    <td>{patient.symptoms}</td>
                    <td>{patient.mobile_number}</td>
                    <td>{patient.address}</td>
                    <td>{patient.appointment_status}</td>
                    <td>
                      <button
                        className={[classes.button, classes.updateButton].join(
                          " "
                        )}
                        onClick={() => this.onUpdate(patient)}
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => this.onDelete(patient._id)}
                        className={[classes.button, classes.deleteButton].join(
                          " "
                        )}
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

export default withRouter(PatientTable);
