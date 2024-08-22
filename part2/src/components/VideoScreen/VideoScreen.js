import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import VideoContent from './VideoContent/VideoContent';
import { useParams } from 'react-router-dom';
import './VideoScreen.css';
import { jwtDecode } from 'jwt-decode';
import VideoCollection from '../VideoCollection/VideoCollection';

const VideoScreen = ({ isDarkMode, setIsDarkMode, doSearch }) => {
  const { id, pid } = useParams();
  const [videoOwner, setVideoOwner] = useState(null);
  const [video, setVideo] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const token = localStorage.getItem('token');

  const [videoList, setVideoList] = useState([]);
  useEffect(() => {
    const fetchVideos = async () => {
      try {
          const res = await fetch('http://localhost:8200/api/videos/all', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        setVideoList(data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);


  useEffect(() => {
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        if (decodedUser) {
          setUserEmail(decodedUser.email);
        }
      } catch (error) {}
    } else {
    }
  }, [token, id, pid]);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8200/api/users/${id}/videos/${pid}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setVideo(data);
      } catch (error) {
        console.error('Error fetching video data:', error);
      }
    };
    fetchVideoDetails();
  }, [pid]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (userEmail) {
        try {
          const res = await fetch(`http://localhost:8200/users/${userEmail}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const data = await res.json();
          setCurrentUser(data);
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      }
    };
    fetchCurrentUser();
  }, [userEmail]);

  useEffect(() => {
    const fetchVideoOwner = async () => {
        try {
          const res = await fetch(`http://localhost:8200/api/users/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const data = await res.json();
          setVideoOwner(data);
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
    };
    fetchVideoOwner();
  }, []);
  console.log("video screen user:", videoOwner);
  console.log("video screen user email:", id);

  if (!video) {
    return <p>Video not found</p>;
  }

  return (
    <div className="main-screen">
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} doSearch={doSearch} />
      <div className="video-main-content">
        <div className="video-screen-content">
          <VideoContent video={video} owner={videoOwner} currentUser={currentUser} />
        </div>
        <div className='recommended-videos'>
          <div className='recommended-title'>Recommended Videos</div>
          <VideoCollection videos={videoList} />
        </div>
      </div>
    </div>
  );
};

export default VideoScreen;

