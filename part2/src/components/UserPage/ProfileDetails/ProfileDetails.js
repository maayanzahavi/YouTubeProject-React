import React from 'react';
import ProfilePicture from '../../ProfilePicture/ProfilePicture';
import './ProfileDetails.css';
import { useNavigate } from 'react-router-dom';

const ProfileDetails = ({ user }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  let loggedInUserEmail = '';

  console.log('Token:', token); 

  if (token) {
    try {
      const base64Url = token.split('.')[1];
      console.log('Base64Url:', base64Url); 
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      console.log('JSON Payload:', jsonPayload); 
      const decodedToken = JSON.parse(jsonPayload);
      loggedInUserEmail = decodedToken.email;
      console.log('Logged in user email:', loggedInUserEmail); 
    } catch (error) {
      console.error('Failed to decode token', error);
    }
  }
  const handleAccountInfo = () => {
    navigate(`/home/api/users/${user.email}/account`);
  };

  return (
    <div className="profile-details-horizontal">
      <div className="profile-picture-container">
        <ProfilePicture user={user} className="profile-pic-big" />
        {loggedInUserEmail === user.email && (
          <div className="account-link" onClick={handleAccountInfo}>Edit Profile</div>
        )}
      </div>
      <div className="profile-text">
        <p className="name">{user.firstName} {user.lastName}</p>
        <p className="displayname">{user.displayName}</p>
        <p className="email">{user.email}</p>
      </div>
    </div>
  );
};

export default ProfileDetails;
