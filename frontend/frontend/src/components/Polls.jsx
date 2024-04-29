import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { getPolls, getCurrentPoll } from "../store/actions";
import "../styles/polls.css"; // Import your CSS file
import ErrorMessage from "./ErrorMessage";

class Polls extends Component {

    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this)
    }
    
    componentDidMount() {
        const { getPolls } = this.props;
        getPolls();
    }
    
    handleSelect(id)
    {
        const {getCurrentPoll} = this.props
        getCurrentPoll(id)
    }
    
    render() {
        const { auth, getPolls } = this.props;

        if (typeof auth.isAuthenticated !== 'boolean') {
            return <div>Loading...</div>;
        }

        const polls = this.props.polls.map(poll => (
            <li onClick={() => this.handleSelect(poll._id)} key={poll._id}>{poll.halka}</li>
        ));

        return (
            <Fragment>
                <ErrorMessage/>
                {auth.isAuthenticated && (
                    <div className="polls-button-container">
                    </div>
                )}
                <ul className="polls-list">{polls}</ul>
            </Fragment>
                //<button className="polls-button" onClick={getPolls}></button>
                );
            }
        }
        
        export default connect(store => ({
            auth: store.auth,
            polls: store.polls
        }), { getPolls, getCurrentPoll })(Polls);
        