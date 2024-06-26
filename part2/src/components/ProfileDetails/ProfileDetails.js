import React from 'react';
import ProfilePicture from '../ProfilePicture/ProfilePicture';
import './ProfileDetails.css';
import { useNavigate } from 'react-router-dom';

const ProfileDetails = ({ user }) => {
    const navigate = useNavigate();
    const handleAccountInfo = () => {
        navigate(`/home/api/users/${user.email}/account`);
    };

  return (
    <div className="profile-details-horizontal">
      <div className="profile-picture-container">
        <ProfilePicture user={user} className="profile-pic-big" />
        <div className="account-link" onClick={handleAccountInfo}>Edit Profile</div>
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
