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
      patients: [],
    };
  }
  componentDidMount() {
    console.log("firing api");
    Axios.get(
      `${
        process.env.REACT_APP_BASE_URL
      }/GetApprovedAppointments/${localStorage.getItem("id")}`
    )
      .then((response) => {
        console.log("data", response);

        console.log(response.data.data);

        this.setState({
          patients: response.data.data,
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
    return (
      <DoctorWrapper>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 offset-md-2'>
              <h1 className='text-center'>Patients</h1>
              <table className='table'>
                <tr style={{ background: "#0c5694", color: "white" }}>
                  <th>Number</th>
                  <th>Patient Name</th>
                  <th>Mobile Number</th>
                  <th>Profile</th>
                </tr>
                {this.state.patients.map((appoint) => (
                  <tr key={appoint[0]._id}>
                    <td>{appoint[0].patientId} </td>
                    <td>
                      {appoint[0].first_name} {appoint[0].last_name}{" "}
                    </td>
                    <td>{appoint[0].mobile_number} </td>
                    <td style={{ background: "#0c5694", color: "white" }}>
                      <Link
                        style={{ color: "white" }}
                        to={`/patient-history/${appoint[0]._id}`}
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          </div>
        </div>
      </DoctorWrapper>
    );
  }
}
export default withRouter(index);
