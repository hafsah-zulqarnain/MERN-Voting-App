import * as api from '../../services/api'
import { SET_POLLS,SET_CURRENT_POLL, SET_USERS ,UPDATE_USER_SUCCESS, UPDATE_PROFILE_SUCCESS } from "../actionTypes"; 
import { addError, removeError } from "./error";

// Action creators
export const updateProfileSuccess = (updatedProfile) => ({
    type: UPDATE_PROFILE_SUCCESS,
    updatedProfile,
});
export const updateUserSuccess = (user) => ({
  type: UPDATE_USER_SUCCESS,
  user,
});

export const setPolls =  polls  => ({
    type: SET_POLLS,
    polls
})

export const setCurrentPoll =  poll  => ({
    type: SET_CURRENT_POLL,
    poll
})
export const setUsers = users => ({
    type: SET_USERS,
    users
});
  


export const getPolls =() => {
    return async dispatch => {
        try {
            const polls = await api.call('get','polls')
            console.log(polls)
            dispatch(setPolls(polls))
            dispatch(removeError())
        } catch (err) {
            const error = err.response.data
            console.log(error)
            dispatch(addError(error))
        }
    }
}


export const getUsers = () =>{
    return async dispatch =>{
        try {
            const users = await api.call('get','polls/admin')
            dispatch(setUsers(users))
            dispatch(removeError())
        } catch (err) {
            const error = err.response.data
            console.log(error)
            dispatch(addError(error))
        }
    }
}

export const createPoll = data =>{
    return async dispatch =>{
        try {
            const poll = await api.call('post','polls/admin', data)
            dispatch(setCurrentPoll(poll))
            dispatch(removeError())
        } catch (err) {
            const error = err.response.data
            console.log(error)
            dispatch(addError(error))
        }
    }
}

export const updateUserStatus = (data) => {
    return async (dispatch) => {
      console.log("Updating user status with data:", data); // Debugging
      try {
        const updatedUser = await api.call("patch", "polls/admin", data);

        console.log("Update successful:", updatedUser); // Debugging
        dispatch(updateUserSuccess(updatedUser));
      } catch (err) {
        const error = err.response.data
        console.error("Update failed:", err.response.data); // Debugging
        dispatch(addError(error))
      }
    };
  };
  

export const getCurrentPoll = path =>{
    return async dispatch =>{
        try {
            const poll= await api.call('get',`polls/${path}`)
            console.log(poll)
            dispatch(setCurrentPoll(poll))
            dispatch(removeError())
        } catch (err) {
            const error = err.response.data
            console.log(error)
            dispatch(addError(error))
        }
    }
} 
export const updateProfile = (profileData) => {
    return async (dispatch) => {
      console.log("Updating user profile with data:", profileData); // Debugging
      try {
        const updatedProfile = await api.call("patch", "polls/user", profileData);
  
        console.log("Update successful:", updatedProfile); // Debugging
        dispatch(updateProfileSuccess(updatedProfile));
      } catch (err) {
        const error = err.response.data;
        console.error("Update failed:", error); // Debugging
        dispatch(addError(error));
      }
    };
  };

  
export const vote = (path, data) =>
{
    return async dispatch =>{
        try {
            const poll = await api.call('post',`polls/${path}`,data)
            dispatch(setCurrentPoll(poll))
            dispatch(removeError())
        } catch (err) {
            const error = err.response.data
            console.log(error)
            dispatch(addError(error))
        }
    }
}
// router.route('/admin')
//       //.get(auth,handle.usersPolls)
//       .get(auth, handle.getAllUsers)
//       .post(auth,handle.createPoll)
//       .patch(auth,handle.updateUserStatus)


// router.route('/:id')
//         .get(handle.getPoll)
//         .post(auth, handle.vote)