import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../store/actions';
import '../styles/loginPage.css'; 

const UserList = ({ users, getUsers }) => {
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div className="Users-container"> {/* Apply styling to the container */}
      <h2 className="login-header"></h2> {/* Apply styling to the heading */}
      <ul>
        <div className='Time-header'>Users</div>
        {users.map(user => (
          <li key={user._id} className="user-item"> {/* Apply styling to the list item */}
            <p className='user-item'>CNIC: {user.cnic}</p>
            <p className='user-item'>Halka: {user.halka}</p>
            <p className='user-item'>Created At: {user.created}</p>
            <p className='user-item'>Role: {user.role}</p>
            <p className='user-item'>Is Registered: {user.isRegistered ? 'Yes' : 'No'}</p> {/* Convert boolean to Yes/No */}
            <p className='user-item'>Is Candidate: {user.isCandidate ? 'Yes' : 'No'}</p> {/* Convert boolean to Yes/No */}
            <p className='user-item'>Approved: {user.approved ? 'Yes' : 'No'}</p> {/* Convert boolean to Yes/No */}
            <p className='user-item'>User-Id: {user._id}</p> {/* Convert boolean to Yes/No */}
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = state => ({
  users: state.users.users
});

export default connect(mapStateToProps, { getUsers })(UserList);
