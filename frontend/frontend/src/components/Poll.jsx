import React from "react";
import {connect} from 'react-redux'
import {vote} from '../store/actions'
import {Chart, ArcElement} from 'chart.js'
import { Doughnut, Pie } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend } from "chart.js";
import "../styles/poll.css"; // Import your CSS file

ChartJS.register(ArcElement,Legend);

const colorArray = [
    "#71955A","#E1F4CB","#BACBA9","#717568","#3F4739","#92B53F","#85A366"// Add more colors as needed
];

let colorIndex = 0;

const getColor = () => {
    const color = colorArray[colorIndex];
    colorIndex = (colorIndex + 1) % colorArray.length;
    return color;
};
const Poll = ({poll, vote}) => {
    if (!poll.options) {
        return <div>Loading...</div>; // Add loading indicator or message
    }
    console.log(!poll.options)
    const answers = poll.options &&
    poll.options.map(option => (
        <button className="answer-button"
        onClick={() => vote(poll._id, { answer: option.option })}
        key={option._id}>
        {option.option}
       </button>
    ));
    console.log("Poll options:",poll.options)
    
    const data ={
        labels: poll.options.map(option => option.option),
        datasets: [ 
            {
                 labal: poll.halka,
                 backgroundColor: poll.options.map(option => getColor()),
                 borderColor: '#333',
                 data: poll.options.map(option => option.votes)
            }
        ]
    }
    const chartOptions = {// Set to false to adjust size according to the container
        responsive: true, // Set to true to allow responsiveness
        plugins: {
          legend: {
            display: true,
            position: 'top'
          }
        }
      };
    return (
        
        <div className="poll-container">
            <h3 className="poll-title">{poll.halka}</h3>
            <div className="answers">{answers}</div>
            <div className="chart-container">
                <Pie data={data} options={chartOptions} /> {/* Adjust width and height */}
            </div>
        </div>
    );
};

export default connect(store => ({
    poll: store.currentPoll
}),{vote})(Poll);
