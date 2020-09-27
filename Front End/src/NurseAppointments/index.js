import React from "react";
import { Link, withRouter } from "react-router-dom";
import PatientWrapper from "../PatientWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";
import classes from "./style.module.css";
import NurseWrapper from "../NurseWrapper";
class NurseAppointment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      patients: [],
    };
  }
  handleStatusUpdate = (patientId, status) => {
    Axios.put(`${process.env.REACT_APP_BASE_URL}/updateStatus`, {
      id: patientId,
      status: status,
    })
      .then((response) => {
        Swal.fire("Success", "Patient Updated Successfully", "success");
        window.location.reload();
      })
      .catch((e) => {
        Swal.fire(
          "error",
          `${e.response.data.message}`.toLocaleUpperCase(),
          "error"
        );
      });
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
  showDetails = (appointment) => {
    localStorage.setItem(
      "patientHistorySingleAppintment",
      JSON.stringify(appointment)
    );
    this.props.history.push("/nurse-appointment-single/details");
  };
  render() {
    return (
      <NurseWrapper>
        <h1 className='text-capitalize text-center'>Patient Section</h1>
        <table className={classes.table} style={{ marginTop: "30px" }}>
          <thead>
            <tr>
              <th className={classes.paddingLeft}></th>
              <th>ID</th>
              <th>Name</th>
              <th>Symptoms</th>
              <th>Mobile</th>
              <th>Address</th>
              <th>Appointment Status</th>
              <th>Accept</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {this.state.patients.map((patient, id) => (
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
                    onClick={() => {
                      this.handleStatusUpdate(patient._id, "Accepted");
                    }}
                    className='btn btn-success'
                  >
                    Accept
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      this.handleStatusUpdate(patient._id, "Rejected");
                    }}
                    className='btn btn-danger'
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </NurseWrapper>
    );
  }
}
export default withRouter(NurseAppointment);
