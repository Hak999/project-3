import React, { useState } from 'react';
import "./Resources/style.css";
import Axios from "axios";
import Swal from "sweetalert2"
import AddDoctor from "../AddDoctor";
import AddPatient from '../AddPatient';
import { Link } from 'react-router-dom';
import Navbar from '../NavElements/navbar';
const SignUp = () => {
    const [role,setRole]=useState("patient");
    return (<>
    <Navbar />
<div class="background">
        <div class="sign-in col-md-3 login-form-2 ">
            <h3 class="pb-4 text-white ">Welcome! Please Sign Up!</h3>
            <form
            //  onSubmit={Signin}
             >
                {/* <select class="form-control mb-3"
                onChange={(e)=>setRole(e.target.value)}
                >
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                  </select> */}
                  {/* {role==="patient"? */}
 <AddPatient />
{/* :<AddDoctor /> */}
                {/* } */}
                    <Link to="/" class="ForgetPwd text-white " >Already Have an Account ?</Link>
            </form>
        </div>
    </div>
    </>  );
}

export default SignUp;