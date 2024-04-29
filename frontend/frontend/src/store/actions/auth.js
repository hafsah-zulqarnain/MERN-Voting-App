import { addError, removeError} from  './error'
import { SET_CURRENT_USER } from '../actionTypes' 
import * as api from '../../services/api'

// Functions needed to to authentication
export const setCurrentUser = user => {
    console.log('setCurrentUser action dispatched with user:', user);
    return {
      type: SET_CURRENT_USER,
      user
    };
  }
  
export const setToken = token => {
    api.setToken(token)
}

export const logout= () =>
{
    return dispatch =>{
        localStorage.clear()
        //To get rid of token set in axios
        api.setToken(null)
        dispatch(setCurrentUser({}))
        dispatch(removeError())
        
    }
}

export const authUser= (path, data) =>{
    return async dispatch =>{
        try {
            const {token, ...user} = await api.call('post',`auth/${path}`,data)
            localStorage.setItem('jwtToken', token )
            api.setToken(token)
            
            dispatch(setCurrentUser(user))
            dispatch(removeError())
        } catch (err) {
            
            console.log(err.response.data)
            const error = err.response.data
            console.log(error)
            dispatch(addError(error))
        }
    }
}