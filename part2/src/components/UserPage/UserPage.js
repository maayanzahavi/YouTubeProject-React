import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import VideoCollection from '../VideoCollection/VideoCollection';
import ProfileDetails from './ProfileDetails/ProfileDetails';
import {jwtDecode} from 'jwt-decode'; 
import './UserPage.css';

const UserPage = ({ users, setUser, setVideos, isDarkMode, setIsDarkMode }) => {
  const { id } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const [videoList, setVideoList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        if (decodedUser) {
          setUserEmail(decodedUser.email);
        }
      } catch (error) {
        console.error('Failed to decode token', error);
      }
    }
  }, []);

  useEffect(() => {
    const fetchUserDetails = async (userId, setUser) => {
      if (userId) {
        try {
          const res = await fetch(`http://localhost:8200/api/users/${userId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const data = await res.json();
          setUser(data);
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      }
    };

    fetchUserDetails(userEmail, setCurrentUser);
    fetchUserDetails(id, setUserDetails);
  }, [userEmail, id]);

  useEffect(() => {
    const fetchUserVideos = async () => {
      try {
        const res = await fetch(`http://localhost:8200/api/users/${id}/videos`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await res.json();
        setVideoList(data);
      } catch (error) {
        console.error('Error fetching user videos:', error);
      }
    };

    fetchUserVideos();
  }, [id]);

  if (!userDetails) {
    return <div>No user found.</div>;
  }

  return (
    <div className="main-screen">
      <Navbar user={currentUser} setUser={setUser} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <div className="main-content">
        <ProfileDetails user={userDetails} currentUser={currentUser} />
        <div className="separator"></div>
        <div className="video-content">
          <VideoCollection videos={videoList} users={users} setVideos={setVideos} />
        </div>
      </div>
    </div>
  );
};

export default UserPage;
