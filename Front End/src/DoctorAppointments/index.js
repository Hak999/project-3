import React from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import classes from "./style.module.css";
import { Link, withRouter } from "react-router-dom";
import moment from "moment";

class DoctorAppointments extends React.Component {
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
  detailAppoint = (appointment) => {
    localStorage.setItem("updateAppointment", JSON.stringify(appointment));
    this.props.history.push("/detail-appointment");
  };
  componentDidMount() {
    Axios.get(
      `${
        process.env.REACT_APP_BASE_URL
      }/getDocAppointments/${localStorage.getItem("id")}`
    )
      .then((response) => {
        console.log("data", response);
        console.log(response.data.data);

        this.setState({
          appointments: response.data.data,
        });
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
    const { appointments } = this.state;
    return (
      <>
        {/* <Link to="/create-appointment" onClick={AddDoctorClick}>
            {" "}
            <button className={[classes.button, classes.buttonAdd].join(" ")}>
              create appointments
            </button>
          </Link> */}
        <h1 style={{ textAlign: "center" }}>Appointment Section</h1>
        <table className={classes.table}>
          <thead>
            <tr>
              <th className={classes.paddingLeft}></th>
              <th>Patient Name</th>
              <th>Symptoms</th>
              <th>Mobile Number</th>
              <th>Address</th>
              <th>Date</th>
              <th>Time</th>
              <th>Add Prescription</th>

              {/* <th>Delete</th> */}
            </tr>
          </thead>
          <tbody>
            {appointments.map((appoint) =>
              !appoint.docCase ? (
                appoint.patient.length ? (
                  <tr key={appoint._id}>
                    <td className={classes.paddingLeft}></td>
                    <td onClick={() => this.detailAppoint(appoint)}>
                      {appoint.patient.length
                        ? `${appoint.patient[0].first_name} ${appoint.patient[0].last_name}`
                        : "----"}
                    </td>
                    <td onClick={() => this.detailAppoint(appoint)}>
                      {appoint.patient.length
                        ? `${appoint.patient[0].symptoms}`
                        : "----"}
                    </td>
                    <td onClick={() => this.detailAppoint(appoint)}>
                      {appoint.patient.length
                        ? appoint.patient[0].mobile_number
                        : "----"}
                    </td>
                    <td onClick={() => this.detailAppoint(appoint)}>
                      {appoint.patient.length
                        ? appoint.patient[0].address
                        : "-----"}
                    </td>
                    <td onClick={() => this.detailAppoint(appoint)}>
                      {appoint.patient.length
                        ? moment(appoint.date).format("ddd MMM DD YYYY")
                        : "----"}
                    </td>
                    <td onClick={() => this.detailAppoint(appoint)}>
                      {appoint.patient.length ? appoint.time : "----"}
                    </td>

                    {/* <td>{moment(appoint.time, "H:MM A").format("HH:MM A")}</td> */}
                    {/* <td onClick={()=>detailAppoint(appoint)}>{appoint.docCase?"Yes":"No"}</td> */}
                    <td>
                      <button
                        className={[classes.button, classes.updateButton].join(
                          " "
                        )}
                        onClick={() => this.onUpdate(appoint)}
                      >
                        {appoint.patient.length
                          ? appoint.docCase
                            ? "Modify"
                            : "Add Prescription"
                          : "----"}
                      </button>
                    </td>
                  </tr>
                ) : null
              ) : null
            )}
          </tbody>
        </table>
      </>
    );
  }
}

export default withRouter(DoctorAppointments);
