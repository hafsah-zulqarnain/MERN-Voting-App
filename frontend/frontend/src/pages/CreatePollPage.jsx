import React from "react"
import {useNavigate } from "react-router"
import CreatePoll from '../components/CreatePoll'
import ErrorMessage from "../components/ErrorMessage";
import Navbar from "../containers/Navbar";
const CreatePollPage = ({ isAuthenticated }) => {
    const Navigate = useNavigate();
    if (!isAuthenticated)
      return <Navigate to='/login' />;
  
    return (
      <div>
        <ErrorMessage />
        <Navbar/>
        <CreatePoll />
      </div>
    );
  };
  
  export default CreatePollPage;
  