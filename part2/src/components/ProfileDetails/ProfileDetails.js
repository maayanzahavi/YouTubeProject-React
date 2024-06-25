import React from 'react';
import ProfilePicture from '../ProfilePicture/ProfilePicture';
import './ProfileDetails.css';

const ProfileDetails = ({ user }) => {
  return (
    <div className="profile-details-horizontal">
      <ProfilePicture user={user} className="profile-pic-big" />
      <div className="profile-text">
        <p className="name">{user.firstName} {user.lastName}</p>
        <p className="displayname">{user.displayName}</p>
        <p className="email">{user.email}</p>
      </div>
    </div>
  );
};

export default ProfileDetails;
