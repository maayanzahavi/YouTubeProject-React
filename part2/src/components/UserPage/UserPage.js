import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import VideoCollection from '../VideoCollection/VideoCollection';
import ProfileDetails from '../ProfileDetails/ProfileDetails';
import './UserPage.css';

const UserPage = ({ users, setUser, setVideos, isDarkMode, setIsDarkMode, currentUser }) => {
  const { id } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await fetch(`http://localhost:8200/api/users/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await res.json();
        setUserDetails(data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    const fetchUserVideos = async () => {
      try {
        const res = await fetch(`http://localhost:8200/api/users/${id}/videos`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await res.json();
        setVideoList(data);
      } catch (error) {
        console.error('Error fetching user videos:', error);
      }
    };

    fetchUserDetails();
    fetchUserVideos();
  }, [id]);

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main-screen">
      <Navbar user={currentUser} setUser={setUser} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <div className="main-content">
        <ProfileDetails user={userDetails} />
        <div className="separator"></div>
        <div className="video-content">
          <VideoCollection videos={videoList} users={users} setVideos={setVideos} />
        </div>
      </div>
    </div>
  );
};

export default UserPage;
