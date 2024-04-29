import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import decode from 'jwt-decode';
import { Provider } from 'react-redux';
import { store } from '../store';
import { setToken, setCurrentUser, addError } from '../store/actions';

import Auth from '../components/Auth';
import Poll from '../components/Poll';
import Polls from '../components/Polls';
import ErrorMessage from '../components/ErrorMessage';
import CreatePoll from '../components/CreatePoll';
import Navbar from '../containers/Navbar';
import Timer from '../components/Timer';
import UserList from '../components/GetUsers'
import UserStatusUpdate from '../components/UserEdit'
import ProfileUpdate from '../components/ProfileUpdate';
import Results from '../components/Results';
import LandingPage from './Landingpage';
const startingTime = new Date("2023-08-18T16:00:00");
const endingTime = new Date("2023-08-18T17:00:00");

if (localStorage.jwtToken) {
  setToken(localStorage.jwtToken);
  try {
    store.dispatch(setCurrentUser(decode(localStorage.jwtToken)));
  } catch (err) {
    store.dispatch(setCurrentUser({}));
    store.dispatch(addError(err));
  }
}

const UITest = props => (
  <Provider store={store}>
    <Fragment>
    <h2>Landing Page</h2>
    <LandingPage/>
    <hr/>
    
    <h2>Navbar </h2>
      <Navbar/>
      <hr />
      <h1>UI Test Page</h1>

      <h2>Testing Error Component: </h2>
      <ErrorMessage />
      <hr />

      <h2>Testing Auth Component: </h2>
      <Auth />
      <hr />

      <h2>Testing Create Poll Component: </h2>
      <CreatePoll />
      <hr />

      <h2>Testing Polls Component: </h2>
      <Polls />
      <hr />

      <h2>Testing Poll Component: </h2>
      <Poll />
      <hr />

      <h2>Timer</h2>
      <Timer/>
      <hr />


      <h2>User List</h2>
      <UserList/>
      <hr />

      <h2>User Edit</h2>
      <UserStatusUpdate/>
      <hr />

      <h2>User Edit</h2>
      <ProfileUpdate/>
      <hr />
     
      <h2>Results</h2>
      <Results/>
      <hr />


     
    </Fragment>
  </Provider>
);

export default (UITest);