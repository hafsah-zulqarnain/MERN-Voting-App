import React, { useState, useEffect } from "react";
import Polls from "./Polls";
import PollPage from "./Poll";
import Results from "./Results";
import Navbar from "../containers/Navbar";
import ErrorMessage from "./ErrorMessage";

const Timer = ({isAdmin}) => {
  const [startTime, setStartTime] = useState(sessionStorage.getItem("startTime") || "");
  const [endTime, setEndTime] = useState(sessionStorage.getItem("endTime") || "");
  const [remainingTime, setRemainingTime] = useState(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [arePollsVisible, setArePollsVisible] = useState(false); 
  const [isTimerEnded, setIsTimerEnded] = useState(false);
  
  
  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };
  
  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };
  
  const startTimer = (end) => {
    setIsTimerRunning(true);
    const interval = setInterval(() => {
      const now = new Date();
      if (now >= end) {
        clearInterval(interval);
        setRemainingTime(null);
        setIsTimerRunning(false);
        setStartTime(null); // Enable start time input
        setEndTime(null);   // Enable end time input
        sessionStorage.removeItem("startTime");
        sessionStorage.removeItem("endTime");
        setArePollsVisible(false);
        setIsTimerEnded(true); // Timer has ended
        return;
      }
      
      const remainingMilliseconds = end - now;
      setRemainingTime(remainingMilliseconds);
      setArePollsVisible(true);
    }, 1000);
  };
  
  useEffect(() => {
    if (startTime && endTime && !isTimerRunning)  {
      const sessionStartTime = sessionStorage.setItem("startTime",startTime);
      const sessionEndTime = sessionStorage.setItem("endTime",endTime);
      
      
      if (sessionStartTime && sessionEndTime) {
        setStartTime(sessionStartTime);
        setEndTime(sessionEndTime);
      } 
      
      const start = new Date(startTime);
      const end = new Date(endTime);

      if (start <= end) {
        const now = new Date();
        const startDifference = start - now;
        
        if (startDifference > 0) {
          setTimeout(() => {
            startTimer(end);
          }, startDifference);
        } else {
          startTimer(end);
        }
      }
    }
  }, [startTime, endTime, isTimerRunning]);

  const formatTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000) % 60;
    const minutes = Math.floor(milliseconds / (1000 * 60)) % 60;
    const hours = Math.floor(milliseconds / (1000 * 60 * 60)) % 24;
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
    
    return `${days} days : ${hours} hours : ${minutes} minutes: ${seconds} seconds`;
  };
  

  return (
    <div>
      <Navbar/>
      <div className="Timer-container">
      {isAdmin && (
          <>
            <h1 className="Time-header">Set Election Schedule</h1>
            <input
              className="login-input"
              type="datetime-local"
              id="startTime"
              placeholder="Start Time"
              value={startTime || ""}
              onChange={handleStartTimeChange}
              disabled={isTimerRunning}
            />
            <input
              className="login-input"
              type="datetime-local"
              id="endTime"
              placeholder="End Time"
              value={endTime || ""}
              onChange={handleEndTimeChange}
              disabled={isTimerRunning}
            />
          </>
        )}
        {remainingTime !== null && (
          <h2 className="hours">Remaining Time: {formatTime(remainingTime)}</h2>
        )}
        <ErrorMessage/>
        <Polls />
        {arePollsVisible && ( 
                  <>
                                <PollPage />
                  </>
                  )}
         {isTimerEnded && (
          <div>
            <h3>Poll Results</h3>
            <Results />
          </div>
        )}
      </div>
    </div>
  );
};

export default Timer;
