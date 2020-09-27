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
      appointment: "",
      app: "",
    };
  }
  showDetails = (appointment) => {
    localStorage.setItem(
      "patientHistorySingleAppintment",
      JSON.stringify(appointment)
    );
    this.props.history.push("/");
  };
  componentDidMount() {
    if (localStorage.getItem("patientHistorySingleAppintment")) {
      const app = JSON.parse(
        localStorage.getItem("patientHistorySingleAppintment")
      );
      this.setState(
        {
          app,
        },
        () => {
          console.log(this.state.app);
        }
      );
    }
  }
  render() {
    const { app } = this.state;
    return (
      <DoctorWrapper>
        <div className={classes.wrapper}>
          <h1>Appointment Detail</h1>
          <div className={classes.row}>
            <h4>Patient Name</h4>{" "}
            <p>
              {app.patient &&
                `${app.patient[0].first_name} ${app.patient[0].last_name}`}
            </p>
          </div>
          <div className={classes.row}>
            <h4>Patient Phone</h4>{" "}
            <p>{app.patient && app.patient[0].mobile_number}</p>
          </div>
          <div className={classes.row}>
            <h4>Symptoms</h4> <p>{app.patient && app.patient[0].symptoms}</p>
          </div>
          <div className={classes.row}>
            <h4>Doctor Name</h4>{" "}
            <p>
              {app.doctor &&
                `${app.doctor[0].first_name} ${app.doctor[0].last_name}`}
            </p>
          </div>
          <div className={classes.row}>
            <h4>Doctor Phone</h4>{" "}
            <p>{app.doctor && app.doctor[0].mobile_number}</p>
          </div>
          <div className={classes.row}>
            <h4>Date</h4> <p>{moment(app.date).format("ddd MMM DD YYYY")}</p>
          </div>
          <div className={classes.row}>
            <h4>Time</h4> <p>{app.time}</p>
          </div>
          <div className={classes.row}>
            <h4>Medication</h4> <p>{app.medication && app.medication}</p>
          </div>
          <div className={classes.row}>
            <h4>Case</h4> <p>{app.docCase && app.docCase}</p>
          </div>
          <div className={classes.row}>
            <h4>Test</h4>{" "}
            <p>
              {app.test ? (
                <a
                  target='blank'
                  href={`${process.env.REACT_APP_IMAGE_URL}/${app.test}`}
                >
                  Click to Downlaod
                </a>
              ) : null}
            </p>
          </div>
        </div>
      </DoctorWrapper>
    );
  }
}
export default withRouter(index);
