import React, { useEffect, useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import classes from "./style.module.css";
import { Link, withRouter } from "react-router-dom";
import moment from 'moment';
const PatientAppointments = (props) => {
    const [appointments, setAppointments] = useState([]);
    const detailAppoint=(appointment)=>{
      localStorage.setItem("updateAppointment", JSON.stringify(appointment));
      props.history.push("/detail-appointment");
    }
    useEffect(() => {
      Axios.get(`${process.env.REACT_APP_BASE_URL}/getPatAppointments/${localStorage.getItem('id')}`)
        .then((response) => {
          console.log("data", response);
          if(response.data.data)
          {
           const data= response.data.data.sort(function(a, b) {
              var dateA = new Date(a.date), dateB = new Date(b.date);
              return dateA - dateB;
          });
          setAppointments([...data]);
          }
        })
        .catch((e) => {
          Swal.fire(
            "error",
            `${e.response.data.message}`.toLocaleUpperCase(),
            "error"
          );
        });
    }, []);

    return (
      <>
      <h1 className={classes.title} style={{textAlign:"center"}}>My Appointment</h1>
        <table className={classes.table}>
          <thead>
            <tr>
              <th className={classes.paddingLeft}></th>
              <th>Doctor Name</th>
              <th>Symptoms</th>
              <th>Mobile Number</th>
              <th>Address</th>
              {/* <th>Department</th> */}
              <th>Time</th>
              <th>Date</th>
              <th>Presc. Added</th>

              {/* <th>Delete</th> */}
            </tr>
          </thead>
          <tbody>
            {appointments.map((appoint) => (
              <tr key={appoint._id}>
                <td onClick={()=>detailAppoint(appoint)} className={classes.paddingLeft}></td>
                <td onClick={()=>detailAppoint(appoint)}>{`${appoint.doctor[0].first_name} ${appoint.doctor[0].last_name}`}</td>
                <td onClick={()=>detailAppoint(appoint)}>{`${appoint.patient[0].symptoms}`}</td>
                <td onClick={()=>detailAppoint(appoint)}>{appoint.doctor[0].mobile_number}</td>
                <td onClick={()=>detailAppoint(appoint)}>{appoint.doctor[0].address}</td>
                {/* <td>{appoint.doctor[0].specialization}</td> */}

          <td onClick={()=>detailAppoint(appoint)}>{appoint.time}</td>
                <td onClick={()=>detailAppoint(appoint)}>{moment(appoint.date).format('ddd MMM DD YYYY') }</td>
                <td onClick={()=>detailAppoint(appoint)}>{appoint.docCase?"Yes":"No"}</td>

          {/* <td>{moment(appoint.time, "H:MM A").format("HH:MM A")}</td> */}

                {/* <td> */}
                  {/* <button
                    className={[classes.button,classes.updateButton].join(' ')}
                    onClick={() => onUpdate(appoint)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button className={[classes.button,classes.deleteButton].join(' ')}
                 onClick={()=>onDelete(appoint._id)}
                  >Delete</button> */}
                {/* </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
}

export default withRouter(PatientAppointments);