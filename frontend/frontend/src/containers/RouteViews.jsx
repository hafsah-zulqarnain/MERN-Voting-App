import React from "react";
import { Routes, Route, useRouter } from 'react-router-dom';
import {connect } from 'react-redux'
import AuthPage from '../pages/AuthPage';
import TestPage from "../pages/TestPage";
import HomePage from "../pages/Homepage";
import CreatePollPage from "../pages/CreatePollPage";
import Timer from '../components/Timer'
import UserListPage  from "../pages/GetUsersPage";
import Polls from '../components/Polls'
import PollPage from "../pages/PollPage";
import UserStatusUpdate from "../components/UserEdit";
import ProfileUpdate from "../components/ProfileUpdate";
import Results from "../components/Results";
import Navbar from "./Navbar";
import LandingPage from "../pages/Landingpage";
const RouteViews = ({auth}) => (
  <main>
    <Routes>
      <Route exact path='/LandingPage' element={<LandingPage/>}/>
      <Route exact path='/Navbar' element={<Navbar isAdmin={auth.isAdmin} />}/>
      <Route exact path='/' element={<HomePage/>}/>
      <Route exact path='/login' element={<AuthPage authType="login" isAuthenticated={auth.isAuthenticated}/>} />
      <Route exact path='/register' element={<AuthPage authType="register" isAuthenticated={auth.isAuthenticated} />} />
      <Route exact path='/poll/new' element={<CreatePollPage isAuthenticated={auth.isAuthenticated} />} />
      <Route exact path='/test' element={<TestPage isAuthenticated={true}/>}/>
      <Route path='/userList' element={<UserListPage />} />
      <Route exact path='/setSchedule' element={<Timer isAdmin={auth.isAdmin}/>}/>
      <Route exact path='/AllPolls' element={<Polls/>}/>
      <Route exact path='/PollPage' element={<PollPage/>}/>
      <Route exact path='/UsersEdit' element={<UserStatusUpdate/>}/>
      <Route exact path='/ProfileUp' element={<ProfileUpdate/>}/>
      <Route exact path='/Results' element={<Results/>}/>
    </Routes>
  </main>
);

export default connect(store => ({ auth: store.auth }))(RouteViews);

