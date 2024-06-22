// Profile Picture component
import React from 'react';
import './ProfilePicture.css';

const ProfilePicture = ({ photo }) => {
  return <img src={photo} alt="Profile" className="profile-pic" />;
};

export default ProfilePicture;
