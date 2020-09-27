import React from 'react';
import "./Resources/style.css";
import { Link } from 'react-router-dom';

const Navbar = () => {
    return ( <nav class="navbar navbar-expand-lg navbar-dark ">
    <Link to="/"><img src={require("./Resources/0c5694.png")} alt="logo" /></Link>
    <button class="navbar-toggler " type="button " data-toggle="collapse " data-target="#navbarNav " aria-controls="navbarNav " aria-expanded="false " aria-label="Toggle navigation ">
        <span class="navbar-toggler-icon "></span>
      </button>
    <div class="collapse navbar-collapse  " id="navbarNav">
        <ul class="navbar-nav ">
            <li class="nav-item ">
                <Link to="/departments" class="nav-link " >Departments </Link>
            </li>
            <li class="nav-item ">
                <Link class="nav-link" to="/contact-us" >Contact Us</Link>
            </li>
        </ul>
    </div>
</nav>  );
}

export default Navbar;