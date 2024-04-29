import React from "react";
import { Navigate } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import Auth from '../components/Auth'

import Navbar from "../containers/Navbar";
import LandingPage from "./Landingpage";

const AuthPage= ({authType,  isAuthenticated}) =>{
    console.log('Authentication',isAuthenticated)
    console.log('AuthPage component. authType:', authType, 'isAuthenticated:', isAuthenticated);
    if (typeof isAuthenticated !== 'boolean') {
        // Handle loading state or other scenarios
        return <div>Loading...</div>;
    }
    if (isAuthenticated) {
        console.log('Authentication',isAuthenticated)
        return <Navbar/>;
    }
    return (
        <div>
            <Auth authType={authType} />
            <ErrorMessage/>
            <LandingPage/>
        </div>
    )
}

export default AuthPage