import {ADD_ERROR,REMOVE_ERROR}  from '../actionTypes'

//state is the entire stste of our application
export default (state= {message: null}, action ) =>{
    switch (action.type) {
        case ADD_ERROR:
            console.log("Adding error:", action.error);
            return {...state, message:action.error}
       
        case REMOVE_ERROR:
            console.log("Removing error");
            return {...state, message:null}

        default:
            return state
    }
}