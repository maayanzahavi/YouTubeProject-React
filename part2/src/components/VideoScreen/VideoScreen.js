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
  const [recommendationsList, setRecommendationsList] = useState([]);

  // Extract user from token
  useEffect(() => {
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        if (decodedUser) {
          setUserEmail(decodedUser.email);
        } else {
          setUserEmail("testuser@example.com");
        }
      } catch (error) {}
    } else {
    }
  }, [token, id, pid]);

  // Get users recommendations
  useEffect(() => {
    const fetchVideos = async () => {
      try {
          const res = await fetch(`/api/users/${id}/videos/${pid}/recommendations/${userEmail}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        setRecommendationsList(data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  // Fetch video details
  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const response = await fetch(`/api/users/${id}/videos/${pid}`, {
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

  // Fetch the current user using their email
  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (userEmail) {
        try {
          const res = await fetch(`/users/${userEmail}`, {
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

  // Featch video owner
  useEffect(() => {
    const fetchVideoOwner = async () => {
        try {
          const res = await fetch(`/api/users/${id}`, {
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
          <VideoCollection videos={recommendationsList} />
        </div>
      </div>
    </div>
  );
};

export default VideoScreen;

