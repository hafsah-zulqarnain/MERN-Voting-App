import React from "react";
import {Link} from 'react-router-dom'
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { logout } from "../store/actions";
import '../styles/Navbar.css'
//import auth from '../pages/AuthPage'
const Navbar = ({auth, logout}) => 
{
    console.log("AuthAdmin",auth.isAdmin)
    if(!auth.isAuthenticated)
    {
        return (<Navigate to="/login"/>)
    }
    return(

        <div className="navbar-container">

            <ul className="navbar-container">
                <li>
                    {auth.isAuthenticated && <Link className="navbar-brand" to="/ProfileUp">{auth.user.cnic}</Link>} 
                </li> 
                <li>
                    <Link className= "navbar-brand"to="/">Results</Link>
                </li> 
                {auth.isAdmin &&(
                    <li>
                    <Link className= "navbar-brand" to="/setSchedule">SetTime</Link>
                </li>)}
                {!auth.isAdmin&&(
                    <li>
                    <Link className= "navbar-brand" to="/setSchedule">Vote</Link>
                </li>)}
                {auth.isAdmin && (
                    <>
                    <li>
                    <Link className= "navbar-brand" to="/userList">Users</Link>
                     </li>
                    <li>
                    <Link className= "navbar-brand" to="/UsersEdit">Approve</Link>
                     </li>
                    <li>
                    <Link className= "navbar-brand" to="/poll/new">CreatePoll</Link>
                     </li>
                    <li>
                    <Link className= "navbar-brand" to="/test">Test</Link>
                     </li>
                    </>
                )}
                {auth.isAuthenticated &&(
                    <li>
                    <a className= "navbar-brand" onClick={logout}>Logout</a>

                </li>)}

                
                <div class="animation start-home"></div>
            </ul>
        </div>
         )
    
}
    export default connect(store => ({auth: store.auth}),{logout})(Navbar)