import React from 'react';
import { Link } from 'react-router-dom';
const AdminDashBoard = (props) => {
    const LoginVar=(role)=>{
        localStorage.setItem("role",role);
        props.history.push("/login")
    }
    return ( <>
<h1>
    Welcome to Hospital Management System
</h1>
<button onClick={()=>LoginVar("admin")}>Admin</button>
<button onClick={()=>LoginVar("patient")}>Patient</button>
<button onClick={()=>LoginVar("doctor")}>Doctors</button>
    </> );
}

export default AdminDashBoard;