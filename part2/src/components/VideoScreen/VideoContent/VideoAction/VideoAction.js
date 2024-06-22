// Component for actions on videos
import React from 'react';
import './VideoAction.css';

const VideoAction = ({ icon, label, action }) => {
  return (
    <button className="video-action-button" onClick={action}>
      {icon}
      <span className="video-action-label">{label}</span>
    </button>
  );
};

export default VideoAction;
