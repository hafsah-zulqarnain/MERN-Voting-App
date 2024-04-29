import React from "react";
import { connect } from 'react-redux';
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js";
import "../styles/poll.css"; // Import your CSS file

ChartJS.register(); // No need to register ArcElement and Legend separately

const colorArray = [
    "#71955A", "#E1F4CB", "#BACBA9", "#717568", "#3F4739", "#92B53F", "#85A366"
    // Add more colors as needed
];

let colorIndex = 0;

const getColor = () => {
    const color = colorArray[colorIndex];
    colorIndex = (colorIndex + 1) % colorArray.length;
    return color;
};

const Results = ({ poll }) => {
    if (!poll.options) {
        return <div>Loading...</div>; // Add loading indicator or message
    }

    const data = {
        labels: poll.options.map(option => option.option),
        datasets: [
            {
                label: poll.halka,
                backgroundColor: poll.options.map(option => getColor()),
                borderColor: '#333',
                data: poll.options.map(option => option.votes)
            }
        ]
    };

    const chartOptions = {
        responsive: true,
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
            <div className="chart-container">
                <Pie data={data} options={chartOptions} />
            </div>
        </div>
    );
};

export default connect(store => ({
    poll: store.currentPoll
}))(Results);
