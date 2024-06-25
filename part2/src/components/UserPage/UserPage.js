import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import VideoCollection from '../VideoCollection/VideoCollection';
import ProfilePicture from '../ProfilePicture/ProfilePicture';
import './UserPage.css';

const UserPage = ({ users, setUser, setVideos, isDarkMode, setIsDarkMode }) => {
  const { userId } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    const fetchUserDetailsAndVideos = async () => {
      try {
        const res = await fetch(`http://localhost:8200/api/users/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await res.json();
        setUserDetails(data.user);
        setVideoList(data.videos);
      } catch (error) {
        console.error('Error fetching user details and videos:', error);
      }
    };

    fetchUserDetailsAndVideos();
  }, [userId]);

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main-screen">
      <Navbar user={userDetails} setUser={setUser} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <div className="main-content">
        <div className="profile-section">
          <ProfilePicture user={userDetails} />
          <div className="profile-details">
            <p className="name">{userDetails.firstName} {userDetails.lastName}</p>
            <p className="email">{userDetails.email}</p>
            <p className="displayname">{userDetails.displayName}</p>
          </div>
        </div>
        <div className="video-content">
          <VideoCollection videos={videoList} users={users} setVideos={setVideos} />
        </div>
      </div>
    </div>
  );
};

export default UserPage;
