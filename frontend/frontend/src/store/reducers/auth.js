import {SET_CURRENT_USER} from '../actionTypes'

const DEFAULT_STATE = {
    isAuthenticated : false,
    isAdmin: false,
    user: {},
}

export default( state = DEFAULT_STATE , action) =>{
    console.log('Reducer called with state:', state, 'and action:', action);
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                isAuthenticated:!!Object.keys(action.user).length,
                isAdmin: action.user.cnic === 'admin',
                user: action.user
            }
        default:
            return state
    }
}

