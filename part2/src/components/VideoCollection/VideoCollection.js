import React from 'react';
import VideoSnapshot from './VideoSnapshot/VideoSnapshot';
import './VideoCollection.css';
import { useNavigate } from 'react-router-dom';

function VideoCollection({ videos }) {
  const navigate = useNavigate();
  const handleVideoClick = (video) => {
    // Increase views
    const updateViews = async () => {
      try {
        const res = await fetch(`http://localhost:8200/api/users/${video.owner}/videos/${video._id}/views`, {
          method: 'PATCH',
          // headers: {
          //   'Content-Type': 'application/json',
          //   'Authorization': `Bearer ${currentUser.token}` // Ensure to pass the token here
          // },
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({})
        });
      } catch (error) {
        console.error('Error setting likes:', error);
      }
    }
    updateViews();

     // Navigate to the video watch screen
     navigate(`/home/api/users/${video.owner}/videos/${video._id}`);
  };

  const videoList = videos.map((video, index) => (
    <div key={index} onClick={() => handleVideoClick(video)}>
      <VideoSnapshot video={video} />
    </div>
  ));

  return (
    <div className="home-page">
      {videoList}
    </div>
  );
}

export default VideoCollection;
