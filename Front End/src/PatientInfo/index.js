import React, { Component } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
// import classes from "./style.module.css";

import { Link, withRouter } from "react-router-dom";
import Home from "../HomeWrapper";
import moment from "moment";
import HomeWrapper from "../HomeWrapper";
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patient: "",
      patientId: this.props.match.params.id,
    };
    console.log(`props`, this.props.match.params.id);
  }
  componentDidMount() {
    const { patientId } = this.state;
    Axios.get(`${process.env.REACT_APP_BASE_URL}/getSinglePatient/${patientId}`)
      .then((response) => {
        console.log("data", response);
        // window.location.reload();
        this.setState(
          {
            patient: response.data.data,
          },
          () => {
            console.log("patient", this.state.patient);
          }
        );
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
  }
  render() {
    const { patient } = this.state;
    return (
      <HomeWrapper>
        <div className='container' style={{ marginTop: "100px" }}>
          <div className='row'>
            <div className='col-md-6 offset-md-3'>
              <h1 className='text-center'>Patient Details</h1>
              {patient ? (
                <table className='table'>
                  <tr align='center'>
                    <th>
                      {" "}
                      <stron>Patient Name </stron>
                    </th>
                    <td>
                      {patient.first_name} {patient.last_name}
                    </td>
                  </tr>
                  <tr align='center'>
                    <th>
                      {" "}
                      <stron>Patient Email </stron>
                    </th>
                    <td>{patient.email}</td>
                  </tr>
                  <tr align='center'>
                    <th>
                      {" "}
                      <stron>Phone Number </stron>
                    </th>
                    <td>{patient.mobile_number} </td>
                  </tr>
                  <tr align='center'>
                    <th>
                      {" "}
                      <stron>Symptoms </stron>
                    </th>
                    <td>{patient.symptoms}</td>
                  </tr>
                  <tr align='center'>
                    <th> Doctor Name</th>
                    <td>
                      {patient.appointed_doctor
                        ? patient.appointed_doctor
                        : "Not Alloted"}
                    </td>
                  </tr>
                  <tr align='center'>
                    <th> Appointment Status</th>
                    <td>{patient.appointment_status}</td>
                  </tr>
                  <tr align='center'>
                    <th> Date</th>
                    <td>
                      {moment(patient.createdAt).format("ddd MMM DD YYYY")}
                    </td>
                  </tr>
                </table>
              ) : (
                <h3>Not Found</h3>
              )}
            </div>
          </div>
        </div>
      </HomeWrapper>
    );
  }
}
export default withRouter(Index);
