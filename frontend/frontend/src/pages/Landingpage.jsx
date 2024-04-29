import React from "react";
import {Link} from 'react-router-dom'
import { connect } from "react-redux";
import '../styles/LandingPage.css'
//import auth from '../pages/AuthPage'
const LandingPage = () => 
{
    return(
    <div >
            <ul className="Landing-container">
                 <li>
                    <Link className= "Landing-brand" to="/login">Login</Link>
                </li>
                <li>
                    <Link className= "Landing-brand" to="/register">Register</Link>
                </li> 
                <div className="animation start-home"></div>
            </ul>
    </div>
    )
}

export default LandingPage;
