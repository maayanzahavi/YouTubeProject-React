import React from 'react';
import Navbar from '../Navbar/Navbar';
import VideoContent from './VideoContent/VideoContent';
import { useParams } from 'react-router-dom';
import './VideoScreen.css';

const VideoScreen = ({ users, user, videos, setVideos, isDarkMode, setIsDarkMode, doSearch, setUser }) => {
  const { id } = useParams();
  const video = videos.find((v) => v.id === parseInt(id));

  // If no video was found with the given id, sends an error
  if (!video) {
    return <p>Video not found</p>;
  }

  return (
    <div className="main-screen">
      <Navbar user={user} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} doSearch={doSearch} setUser={setUser} />
      <div className="main-content">
        <div className="video-screen-content">
          <VideoContent initialVideo={video} users={users} currentUser={user} setVideos={setVideos} />
        </div>
      </div>
    </div>
  );
};

export default VideoScreen;
