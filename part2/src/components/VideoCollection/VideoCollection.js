import React from 'react';
import VideoSnapshot from './VideoSnapshot/VideoSnapshot';
import './VideoCollection.css';
import { useNavigate } from 'react-router-dom';

function VideoCollection({ videos, users, setVideos }) {
  const navigate = useNavigate();
  const handleVideoClick = (video) => {
    // Increase views
    const updatedViews = video.views + 1;
    const updatedVideo = { ...video, views: updatedViews };
    setVideos((prevVideos) => prevVideos.map((v) => (v.id === video.id ? updatedVideo : v)));

     // Navigate to the video watch screen
     navigate(`api/111/video/${video._id}`);
  };

  const videoList = videos.map((video, index) => (
    <div key={index} onClick={() => handleVideoClick(video)}>
      <VideoSnapshot video={video} users={users} />
    </div>
  ));

  return (
    <div className="home-page">
      {videoList}
    </div>
  );
}

export default VideoCollection;
