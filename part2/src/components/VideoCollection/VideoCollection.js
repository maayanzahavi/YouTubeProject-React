import React from 'react';
import VideoSnapshot from './VideoSnapshot/VideoSnapshot';
import './VideoCollection.css';
import { useNavigate } from 'react-router-dom';

function VideoCollection({ videos }) {
  const navigate = useNavigate();
  if (videos.length === 0) {
    return <div className="normal-text">No videos found</div>;
  }
  const handleVideoClick = (video) => {
    // Increase views
    const updateViews = async () => {
      try {
        const res = await fetch(`/api/users/${video.owner}/videos/${video._id}/views`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        console.error('Error setting likes:', error);
      }
    };
    updateViews();

    // Navigate to the video watch screen
    navigate(`/YouTube/users/${video.owner}/videos/${video._id}`);
  };

  const videoList = videos.map((video, index) => (
    <div key={video._id} onClick={() => handleVideoClick(video)}>
      <VideoSnapshot video={video} />
    </div>
  ));

  return <div className="home-page">{videoList}</div>;
}

export default VideoCollection;
