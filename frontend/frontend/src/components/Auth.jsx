import React, { Component } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { authUser, logout } from "../store/actions";

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cnic: "",
            password: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        const { cnic, password } = this.state;
        const { authType } = this.props;
        e.preventDefault();
        this.props.authUser(authType || "login", { cnic, password });
    }
    
    // const handleRegisterClick = () => {
    //     // Navigate to the registration page
    //     return <Navigate to="/register" />;
    //   };
    render() {
        const { cnic, password } = this.state;

        return (
            <div className="login-container">
                <form onSubmit={this.handleSubmit}>
                    <div className="login-header"></div>
                    <input
                        type="text"
                        value={cnic}
                        name="cnic"
                        autoComplete="off"
                        className="login-input"
                        onChange={this.handleChange}
                        placeholder="CNIC"
                    />

                    <input
                        type="password"
                        value={password}
                        name="password"
                        autoComplete="off"
                        className="login-input"
                        onChange={this.handleChange}
                        placeholder="Password"
                    />

                    <button type="submit" className="login-button">
                        Submit
                    </button>
                    <div style={{ margin: '0.5rem 0' }}></div> {/* Add space between buttons */}
                </form>
            </div>
                     //<button class="login-button" onClick={handleRegisterClick}>Register</button>
        );
    }
}

export default connect(() => ({}), { authUser, logout })(Auth);
