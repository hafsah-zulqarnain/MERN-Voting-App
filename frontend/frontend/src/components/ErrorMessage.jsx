import React from "react";
import { connect } from "react-redux";

const ErrorMessage = ({ error }) => {
    if (!error) {
        return null; // Return null if there's no error
    }

    if (!error.message) {
        return <div></div>; // Handle missing message property
    }

    if (!error.message.err) {
        return <div></div>; // Handle missing 'err' property
    }

    return (
        <div>
            {error && <div className="error">{error.message.err}</div>}
        </div>
    );
}

const mapStateToProps = state => ({
    error: state.error // Make sure this matches the correct reducer key and property
});

export default connect(mapStateToProps)(ErrorMessage);
