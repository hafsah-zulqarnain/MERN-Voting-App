import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../store/actions/polls';
import "../styles/loginPage.css";
import Navbar from '../containers/Navbar';
import ErrorMessage from './ErrorMessage';
const ProfileUpdate = () => {
  const dispatch = useDispatch();
  const updating = useSelector((state) => state.profile.profile.updating);
  const error = useSelector((state) => state.profile.profile.error);
  const initialProfile = useSelector((state) => state.profile.profile);

  const [profile, setProfile] = useState(initialProfile);

  useEffect(() => {
    setProfile(initialProfile);
  }, [initialProfile]);

  const handleUpdateProfile = async () => {
    try {
      const message = await dispatch(updateProfile(profile));
      console.log(message); // Log the response message
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  return (
    <>
    <Navbar/>
    <ErrorMessage/>
    <div className="login-container"> {/* Apply the appropriate class name */}
      <h2 className="login-header">Update Profile</h2>
      {error && <p className="error">Error: {error.message}</p>}
      <input
        className="login-input" // Apply the appropriate class name
        type="text"
        placeholder="Halka"
        value={profile.halka}
        onChange={(e) => setProfile({ ...profile, halka: e.target.value })}
        />
      <input
        className="login-input" // Apply the appropriate class name
        type="text"
        placeholder="Role"
        value={profile.role}
        onChange={(e) => setProfile({ ...profile, role: e.target.value })}
        />
      <label className="header">
        Is Candidate:
        <select
            className="login-input"
            value={profile.isCandidate}
            onChange={(e) =>
              setProfile({ ...profile, isCandidate: e.target.value === 'true' })
            }
        >
            <option value="">Select</option>
            <option value="true">True</option>
            <option value="false">False</option>
        </select>
        </label>
        

      <button
        className="login-button" // Apply the appropriate class name
        onClick={handleUpdateProfile}
        disabled={updating}
        >
        Update Profile
      </button>
    </div>
        </>
  );
  
  
  
};

export default ProfileUpdate;
