// reducers/usersReducer.js

import { SET_USERS } from '../actionTypes'; // You provided SET_USERS as an action type

const initialState = {
  users: []
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.users
      };
    default:
      return state;
  }
};

export default usersReducer;
