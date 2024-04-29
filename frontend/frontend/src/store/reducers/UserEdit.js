import {
    UPDATE_USER_SUCCESS,
    // ...other imports
  } from "../actionTypes"; // Adjust the import path as needed
  
  const initialState = {
    // ...your initial state
    updatedUser: null,
    updateUserError: null,
  };
  
  const UserEditReducer = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_USER_SUCCESS:
        console.log("User updated successfully:", action.user); // Debugging
        return {
          ...state,
          updatedUser: action.user,
          updateUserError: null,
        };
      // ...other cases
      default:
        return state;
    }
  };
  
  
  export default UserEditReducer;
  