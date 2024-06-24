import React from 'react';
import './ProfilePicture.css';
import { useNavigate } from 'react-router-dom';

const ProfilePicture = ({ user }) => {
  const navigate = useNavigate();

  if (!user) {
    return null; // or return a placeholder image, loading spinner, etc.
  }

  const handleProfileClick = () => {
    debugger;
    navigate(`/users/${user.email}`);
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
