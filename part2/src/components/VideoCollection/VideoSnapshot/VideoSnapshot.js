// Component for mini video display
import './VideoSnapshot.css';
import React, { useState, useEffect } from 'react';
import ProfilePicture from '../../ProfilePicture/ProfilePicture';

const VideoSnapshot = ({ video }) => {
  const [owner, setOwner] = useState('');

  // Finds the video's owner
  useEffect(() => {
    const fetchVideoOwner = async () => {
      if (video.owner) {
        try {
          const res = await fetch(`http://localhost:8200/api/users/${video.owner}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const data = await res.json();
          setOwner(data);
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      }
    };
    fetchVideoOwner();
  }, [video.owner]); 

  return (
    <button className="video-button">
      <div className="video">
        <img src={video.img} className="video-thumbnail" alt="Video Thumbnail" />
        <div className="video-details">
          {owner && <ProfilePicture user={owner} />}
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
