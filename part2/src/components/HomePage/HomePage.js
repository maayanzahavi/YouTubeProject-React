// Homepage component present the home page (inclding a navbar and videos)
import Navbar from '../Navbar/Navbar';
import VideoCollection from '../VideoCollection/VideoCollection'; 
import './HomePage.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = ({ videos, users, user, setUser, setVideos, isDarkMode, setIsDarkMode }) => {
  
  const [videoList, setVideoList] = useState(videos);
  const navigate = useNavigate();
  const doSearch = function(query) {
    setVideoList(videos.filter((video) => video.title.includes(query)));
    navigate('/home');
  };

  return (
    <div className="main-screen">
      <Navbar user={user} setUser={setUser} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} doSearch={doSearch}/>
      <div className="main-content">
        <div className="video-content">
          <VideoCollection videos={videoList} users={users} setVideos={setVideos} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
