import React, { useEffect, useState } from 'react';
import classes from './style.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faColumns,
    faUserMd,
    faUserInjured,
    faCalendarPlus,
    faBed,
  faHospitalUser,
  faUserNurse
} from "@fortawesome/free-solid-svg-icons";
import Home from '../HomeWrapper';
import Axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
const AdminView = (props) => {
    const [data,setData]=useState();
    useEffect(()=>{
        Axios.get(`${process.env.REACT_APP_BASE_URL}/adminDashboard`).then((res)=>{
            setData(res.data);
            console.log("our data",res);

        }).catch((e)=>{
            console.log(e);
        })
    },[])
    return ( <Home> 
        <h1 className={classes.title}>Dashboard</h1>
        <div className={classes.blocksWrapper}>
        <div className={classes.dashBlock} onClick={()=>props.history.push("/doctors")} >
            <div>
    <h1>{data&&data.doctors}</h1>
                <div><b>Total Doctors</b></div>
                {/* <div><b>Approval Requested</b> : 1</div> */}
            </div>
<div className={classes.IconsWrapper}> <FontAwesomeIcon className={classes.Icons} icon={faUserMd} /></div>
        </div>
        <div className={[classes.dashBlock,classes.dashBlock1].join(' ')} onClick={()=>props.history.push("/patients")} >
            <div>
    <h1>{data&&data.patients}</h1>
                <div><b>Total Patients</b></div>
                {/* <div><b>Wants to Admit</b> : 1</div> */}
            </div>
<div className={classes.IconsWrapper}> <FontAwesomeIcon className={classes.Icons} icon={faUserInjured} /></div>
        </div>
        <div className={[classes.dashBlock,classes.dashBlock2].join(' ')} onClick={()=>props.history.push("/all-appointments")}>
            <div>
    <h1>{data&&data.appointments}</h1>
                <div><b>Total Appointments</b></div>
                {/* <div><b>Approval Requested</b> : 1</div> */}
            </div>
<div className={classes.IconsWrapper}> <FontAwesomeIcon className={classes.Icons} icon={faCalendarPlus} /></div>
        </div>
        <div className={[classes.dashBlock,classes.dashBlock2].join(' ')} onClick={()=>props.history.push("/admin-nurses")}>
            <div>
    <h1>{data&&data.nurses}</h1>
                <div><b>Total Nurses</b></div>
                {/* <div><b>Approval Requested</b> : 1</div> */}
            </div>
<div className={classes.IconsWrapper}> <FontAwesomeIcon className={classes.Icons} icon={faUserNurse} /></div>
        </div>
        <div className={[classes.dashBlock,classes.dashBlock2].join(' ')} onClick={()=>props.history.push("/rooms")}>
            <div>
    <h1>{data&&data.rooms}</h1>
                <div><b>Total Rooms</b></div>
                {/* <div><b>Approval Requested</b> : 1</div> */}
            </div>
<div className={classes.IconsWrapper}> <FontAwesomeIcon className={classes.Icons} icon={faBed} /></div>
        </div>
        <div className={[classes.dashBlock,classes.dashBlock2].join(' ')} onClick={()=>props.history.push("/admin-departments")}>
            <div>
    <h1>{data&&data.departments}</h1>
                <div><b>Total Departments</b></div>
                {/* <div><b>Approval Requested</b> : 1</div> */}
            </div>
<div className={classes.IconsWrapper}> <FontAwesomeIcon className={classes.Icons} icon={faHospitalUser} /></div>
        </div>
    </div>

    </Home>);
}

export default withRouter(AdminView);