import React, { Component } from "react";
import { connect } from "react-redux";
import { updateUserStatus } from "../store/actions"; // Import your updateUserStatus action
import "../styles/polls.css"; // Import the polls.css file with the correct path
import Navbar from "../containers/Navbar";
import ErrorMessage from "./ErrorMessage";

class UserStatusUpdate extends Component {
  state = {
    uid: "",
    isRegistered: "",
    approved: "",
    role: "",
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { uid, isRegistered, approved, role } = this.state;
    const data = {
      uid,
      isRegistered: isRegistered === "true",
      approved: approved === "true",
      role,
    };
    console.log("Submitting data:", data); // Debugging
    try {
      await this.props.updateUserStatus(data);
      console.log("Update successful"); // Debugging
    } catch (error) {
      console.error("Update failed:", error); // Debugging
    }
  };

  render() {
    const { uid, isRegistered, approved, role } = this.state;
    return (
      <>
      <Navbar/>
      <div className="login-container">
        <h2 className="Time-header">Update User Status</h2>
        <form onSubmit={this.handleSubmit}>
          <label className="header">
            User-Id:
            <input
              className="login-input"
              type="text"
              value={uid}
              onChange={(event) => this.setState({ uid: event.target.value })}
              />
          </label>
          <label className="header">
            Is Registered:
            <select
              className="login-input"
              value={isRegistered}
              onChange={(event) =>
                this.setState({ isRegistered: event.target.value })
              }
            >
              <option value="">Select</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </label>
          <label className="header">
            Approved:
            <select
              className="login-input"
              value={approved}
              onChange={(event) =>
                this.setState({ approved: event.target.value })
              }
              >
              <option value="">Select</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </label>
          <label className="header">
            Role:
            <input
              className="login-input"
              type="text"
              value={role}
              onChange={(event) => this.setState({ role: event.target.value })}
              />
          </label>
          <button className="login-button" type="submit">
            Update Status
          </button>
        </form>
      <ErrorMessage/>
      </div>
    </>
    );
  }
}

export default connect(null, { updateUserStatus })(UserStatusUpdate);
