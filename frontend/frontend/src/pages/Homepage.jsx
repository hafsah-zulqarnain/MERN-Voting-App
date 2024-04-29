import React from "react";
import Polls from "../components/Polls";
import ErrorMessage from "../components/ErrorMessage";
import Navbar from "../containers/Navbar";
import Results from "../components/Results";


const HomePage = props =>(
    <div>
        <ErrorMessage/>
        <Navbar/>
        <Polls/>
        <Results/>
    </div>
)

export default HomePage