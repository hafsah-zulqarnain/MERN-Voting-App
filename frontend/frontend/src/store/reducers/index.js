import { combineReducers } from "redux";
import error from './error';
import auth from './auth';
import { polls, currentPoll } from './polls';
import users from './users'; // Import the usersReducer
import UserEditReducer from "./UserEdit"
import profileReducer from "./Profile";

export default combineReducers({
    error,
    auth,
    polls,
    currentPoll,
    users, // Add the usersReducer to the root reducer
    UserEditReducer, // Add the UserEditReducer to the root reducer
    profile: profileReducer,
});
