// Component for uploading videos
import Navbar from '../../Navbar/Navbar';
import VideoEdit from './VideoEdit';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const EditScreen = ({ setVideos, setIdCounter, user }) => {
  const { id, pid } = useParams(); 
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8200/api/users/${id}/videos/${pid}`);
        const data = await response.json();
        setVideo(data);
        console.log("video: ", video);
      } catch (error) {
        console.error('Error fetching user and video data:', error);
      }
    };

    fetchVideoDetails();
  }, [pid, id]);

  if (!video) {
    return <div>No video found...</div>;
  }

  return (
    <div className="upload-screen">
      <Navbar user={user} />
      <div className="upload-content" >
        <VideoEdit video={video} setVideos={setVideos} setIdCounter={setIdCounter} user={user}/>
      </div>
    </div>
  );
};

export default EditScreen;
