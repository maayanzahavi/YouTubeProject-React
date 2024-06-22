import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import VideoCollection from '../VideoCollection/VideoCollection'; 
import './HomePage.css';

const HomePage = ({ users, user, setUser, setVideos, isDarkMode, setIsDarkMode }) => {
  const [videoList, setVideoList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch('http://localhost:8200/api/videos', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await res.json();
        setVideoList(data);
        setVideos(data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, [setVideos]);

  const doSearch = (query) => {
    setVideoList(videoList.filter((video) => video.title.includes(query)));
    navigate('/home');
  };

  return (
    <div className="main-screen">
      <Navbar user={user} setUser={setUser} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} doSearch={doSearch} />
      <div className="main-content">
        <div className="video-content">
          <VideoCollection videos={videoList} users={users} setVideos={setVideos} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
