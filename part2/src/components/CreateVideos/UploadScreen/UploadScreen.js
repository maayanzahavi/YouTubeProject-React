// Component for uploading videos
import React from 'react';
import Navbar from '../../Navbar/Navbar';
import './UploadScreen.css';
import VideoUpload from './VideoUpload';

const UploadScreen = ({ videos, setVideos, id, setIdCounter, user }) => {


  return (
    <div className="upload-screen">
      <Navbar user={user} />
      <div className="upload-content" >
        <VideoUpload videos={videos} setVideos={setVideos} id={id} setIdCounter={setIdCounter} user={user}/>
      </div>
    </div>
  );
};

export default UploadScreen;
