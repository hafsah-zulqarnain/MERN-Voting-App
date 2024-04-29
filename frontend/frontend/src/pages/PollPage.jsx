import React from "react";
import ErrorMessage from '../components/ErrorMessage'
import Poll from '../components/Polls'
import Navbar from "../containers/Navbar";

const PollPage = ()=>
{

    return (
        <div>
            <ErrorMessage/>
            <Navbar/>
            <Poll/>
            
        </div>
    )
}

export default PollPage