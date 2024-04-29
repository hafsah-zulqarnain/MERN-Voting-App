// pages/UserListPage.js

import React from 'react';
import UserList from '../components/GetUsers';
import ErrorMessage from '../components/ErrorMessage';
import Navbar from '../containers/Navbar';

const UserListPage = () => {
  return (
    <div>
      <ErrorMessage/>
      <Navbar/>
      <UserList />
    </div>
  );
};

export default UserListPage;
