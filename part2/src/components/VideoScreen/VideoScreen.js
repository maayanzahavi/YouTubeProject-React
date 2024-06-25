import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import VideoContent from './VideoContent/VideoContent';
import { useParams } from 'react-router-dom';
import './VideoScreen.css';

const VideoScreen = ({ users, setVideos, isDarkMode, setIsDarkMode, doSearch, setUser, currentUser }) => {
  const { id, pid } = useParams(); 
  const [fetchedUser, setFetchedUser] = useState(null);
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8200/api/users/${id}/videos/${pid}`);
        const data = await response.json();
        setVideo(data);
        console.log("video: ", video);
      } catch (error) {
        console.error('Error fetching user and video data:', error);
      }
    };

    const fetchUserDetails = async () => {
      try {
        const res = await fetch(`http://localhost:8200/api/users/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await res.json();
        setFetchedUser(data);
        console.log("user: ", fetchedUser);
        console.log("email: ", id);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchVideoDetails();
    fetchUserDetails();
  }, [pid, id]);

  if (!video) {
    return <p>Video not found</p>;
  }

  return (
    <div className="main-screen">
      <Navbar 
        user={currentUser} 
        isDarkMode={isDarkMode} 
        setIsDarkMode={setIsDarkMode} 
        doSearch={doSearch} 
        setUser={setUser} 
      />
      <div className="main-content">
        <div className="video-screen-content">
          <VideoContent initialVideo={video} owner={fetchedUser} users={users} currentUser={fetchedUser} setVideos={setVideos} />
        </div>
      </div>
    </div>
  );
};

export default VideoScreen;
