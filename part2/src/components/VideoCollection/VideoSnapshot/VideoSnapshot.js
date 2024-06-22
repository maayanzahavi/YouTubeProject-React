// Component for mini video display
import './VideoSnapshot.css';
import React from 'react';
import ProfilePicture from '../../ProfilePicture/ProfilePicture';

const VideoSnapshot = ({ video, users }) => {
  // Finds the video's owner
  const owner = users.find((user) => user.email === video.owner);

  return (
    <button className="video-button">
      <div className="video">
        <img src={video.img} className="video-thumbnail" alt="Video Thumbnail" />
        <div className="video-details">
          {owner && <ProfilePicture photo={owner.photo} />}
          <div className="video-info">
            <h2 className="video-title">{video.title}</h2>
            {owner && <span className="owner-name">{owner.displayName}</span>}
            <p className="video-views">{video.views} views</p>
          </div>
        </div>
      </div>
    </button>
  );
};

export default VideoSnapshot;
