import React, { useState, useEffect } from 'react';
import Navbar from '../../Navbar/Navbar';
import './UploadScreen.css';
import VideoUpload from './VideoUpload';
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode correctly

const UploadScreen = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        if (decodedUser && decodedUser.email) {
          setUserEmail(decodedUser.email);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, [token]); // Re-run this effect if token changes

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (userEmail) {
        try {
          const res = await fetch(`http://localhost:8200/api/users/${userEmail}`, {
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
    fetchUserDetails();
  }, [userEmail]);

  return (
    <div className="upload-screen">
      <Navbar />
      <div className="upload-content">
        <VideoUpload user={currentUser} />
      </div>
    </div>
  );
};

export default UploadScreen;
