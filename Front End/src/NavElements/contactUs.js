import React, { useState } from 'react';

import "./Resources/style.css";
import Navbar from './navbar';

const ContactUs = () => {
    return (<>
    <Navbar />
      <div className="d-flex flex-wrap justify-content-around align-items-center">
    <div>
        <h1 className="border-bottom">We are here for you:</h1>
        <p><i className="fas fa-map-marked pr-2"></i><span className="font-weight-bold">Address: </span>Bucurest, Strada Dobrogei, nr21</p>
        <p><i className="fas fa-phone-alt pr-2"></i><span className="font-weight-bold">Phone number:</span> 0712345678</p>
        <p><i className="fas fa-envelope pr-2"></i><span className="font-weight-bold">Email:</span> contact@medadmin.com</p>
    </div>
    <div className="mt-4 border pr-5 pl-5 pt-2">
        <form>
            <div className="form-group border-bottom">
                <h1>Contact us!</h1>
            </div>
            <div className="form-group">
                <label for="exampleInputEmail1">First Name</label>
                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
            </div>
            <div className="form-group">
                <label for="exampleInputPassword1">Last Name</label>
                <input type="text" className="form-control" id="exampleInputPassword1" />
            </div>
            <div className="form-group">
                <label for="exampleInputEmail">Email</label>
                <input type="email" className="form-control" id="exampleInputEmail" aria-describedby="emailHelp" />
            </div>
            <div className="form-group">
                <label for="examplePhoneNumber">Phone Number</label>
                <input type="number" className="form-control" id="examplePhoneNumber" aria-describedby="emailHelp" />
            </div>
            <div className="form-group">
                <label for="examplePhoneNumber">Send us a Message</label>
                <textarea className="form-control" id="" aria-describedby=" emailHelp "></textarea>
            </div>
            <button type="submit " className="btn btn-primary btn-block ">Submit</button>
        </form>
    </div>
</div></> );
}

export default ContactUs;