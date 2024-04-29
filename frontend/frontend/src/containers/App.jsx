import React, { Fragment} from "react";
// import {Component} from react when testing
import {Provider} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'
//import * as api from '../services/api'
import {store} from '../store'
//import { setToken } from "../services/api";
import decode from 'jwt-decode'
import {setCurrentUser, addError, setToken} from '../store/actions'
//import Auth from "../components/Auth";
//import ErrorMessage from "../components/ErrorMessage";
import RouteViews from "./RouteViews";
import Navbar from "./Navbar";
import LandingPage from "../pages/Landingpage";

// 
// class App extends Component{
//     // Life Cycle Method
//     async componentDidMount()
//     {
//         try {
//             const result = await api.call('post', 'auth/login', {
//                 cnic: 'three',
//                 password: 'password'
//             });
//             console.log(result);
//         } catch (error) {
//             console.error('An error occurred:', error);
//             if(error.response)
//             {
//                 console.error('Server Response', error.response.data);
//             }
//         }
//     }


//     render()
//     {
//         return <div>App Works</div>
//     }
//}
if (localStorage.jwtToken) {
    setToken(localStorage.jwtToken);
    try {
        const decodedToken = decode(localStorage.jwtToken);
        store.dispatch(setCurrentUser(decodedToken)); // Dispatch the user data
    } catch (err) {
        store.dispatch(setCurrentUser({})); // Set an empty user object
        store.dispatch(addError({}));
    }
}


const App = () => {
    return (
    <Provider store={store}>
        <Router>
            <Fragment>    
                <RouteViews/>
            </Fragment>
        </Router>
    </Provider>
    )
}
export default App