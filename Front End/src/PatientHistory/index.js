import Axios from "axios";
import Swal from "sweetalert2";
import React from "react";
import classes from "./style.module.css";
import { Link, withRouter } from "react-router-dom";
import moment from "moment";
import DoctorWrapper from "../DoctorWrapper";
class index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: [],
    };
  }
  onUpdate = (appointment) => {
    localStorage.setItem("updateAppointment", JSON.stringify(appointment));
    this.props.history.push("/Doctor-Prescription");
  };
  showDetails = (appointment) => {
    localStorage.setItem(
      "patientHistorySingleAppintment",
      JSON.stringify(appointment)
    );
    this.props.history.push("/patient-appointment/details");
  };
  componentDidMount() {
    Axios.get(
      `${process.env.REACT_APP_BASE_URL}/GetPatientAppointments/${
        this.props.match.params.patientId
      }/${localStorage.getItem("id")}`
    )
      .then((response) => {
        console.log("data", response);

        console.log(response.data.data);

        this.setState(
          {
            appointments: response.data.data,
          },
          () => {
            console.log(
              "data is here",
              this.state.appointments[0].patient[0].first_name
            );
          }
        );
        // if (response.data.data) {
        //   const data = response.data.data.sort(function (a, b) {
        //     var dateA = new Date(a.date),
        //       dateB = new Date(b.date);
        //     return dateA - dateB;
        //   });

        // }
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
    return (
      <DoctorWrapper>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 offset-md-2'>
              <h1 className='text-center'>
                {this.state.appointments.length
                  ? this.state.appointments[0].patient[0].patientId +
                    "-" +
                    this.state.appointments[0].patient[0].first_name +
                    " " +
                    this.state.appointments[0].patient[0].last_name
                  : "Patient"}
              </h1>
              <table className='table'>
                <tr style={{ background: "#0c5694", color: "white" }}>
                  <th>Mobile Number</th>
                  <th>Address</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Appointment Details</th>
                </tr>
                {this.state.appointments.map((appoint) =>
                  appoint.docCase ? (
                    <tr key={appoint._id}>
                      <td>{appoint.patient[0].mobile_number}</td>
                      <td>{appoint.patient[0].address}</td>
                      <td>{moment(appoint.date).format("ddd MMM DD YYYY")}</td>
                      <td>{appoint.time}</td>
                      <td>
                        <button
                          onClick={() => this.showDetails(appoint)}
                          style={{
                            color: "white",
                            backgroundColor: "#0c5694",
                            textDecoration: "none",
                            float: "left",
                            height: "40px",
                            textAlign: "center",
                            lineHeight: "40px",
                            fontWieght: "bold",
                          }}
                        >
                          {" "}
                          View
                        </button>

                        <button
                          onClick={() => this.onUpdate(appoint)}
                          style={{
                            color: "white",
                            backgroundColor: "#0c5694",
                            textDecoration: "none",
                            float: "right",
                            height: "40px",
                            textAlign: "center",
                            lineHeight: "40px",
                            fontWieght: "bold",
                          }}
                        >
                          {" "}
                          Modify
                        </button>
                      </td>
                    </tr>
                  ) : null
                )}
              </table>
            </div>
          </div>
        </div>
      </DoctorWrapper>
    );
  }
}
export default withRouter(index);
