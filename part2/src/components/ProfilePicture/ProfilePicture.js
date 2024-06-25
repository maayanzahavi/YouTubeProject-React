import React from 'react';
import './ProfilePicture.css';
import { useNavigate } from 'react-router-dom';

const ProfilePicture = ({ user }) => {
  const navigate = useNavigate();

  if (!user) {
    return null; 
  }

  const handleProfileClick = () => {
    navigate(`/home/api/users/${user.email}/videos`);
  };

  return (
    <img 
      src={user.photo} 
      alt="Profile" 
      className="profile-pic" 
      onClick={handleProfileClick} 
    />
  );
};

export default ProfilePicture;
