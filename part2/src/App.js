import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import LoginEmail from './components/LoginScreen/loginEmail';
import LoginPassword from './components/LoginScreen/loginPassword';
import SignUpName from './components/SignUpScreen/signUpName';
import SignUpEmail from './components/SignUpScreen/signUpEmail';
import SignUpPassword from './components/SignUpScreen/signUpPassword';
import SignUpDisplay from './components/SignUpScreen/signUpDisplay';
import HomePage from './components/HomePage/HomePage';
import VideoScreen from './components/VideoScreen/VideoScreen';
import UploadScreen from './components/UploadScreen/UploadScreen';
import videosData from './data/videos.json';
import usersData from './data/users.json';
import UserPage from './components/UserPage/UserPage';

function App() {
  const [idCounter, setIdCounter] = useState(11);
  const [videos, setVideos] = useState(videosData);
  const [users, setUsers] = useState(usersData);
  const [currentUser, setCurrentUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const addUser = (user) => {
    setCurrentUser(user);
    setUsers((users) => [...users, user]);
  };

  return (
    <div className="App" data-theme={isDarkMode ? 'dark' : 'light'}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/login-email" element={<LoginEmail users={users} />} />
          <Route path="/login-password" element={<LoginPassword setCurrentUser={setCurrentUser} />} />
          <Route path="/signup-name" element={<SignUpName />} />
          <Route path="/signup-email" element={<SignUpEmail users={users} />} />
          <Route path="/signup-password" element={<SignUpPassword />} />
          <Route path="/signup-display" element={<SignUpDisplay addUser={addUser} />} />
          <Route
            path="/home"
            element={
              <HomePage
                videos={videos}
                users={users}
                user={currentUser}
                setUser={setCurrentUser}
                setVideos={setVideos}
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
              />
            }
          />
          <Route
            path="api/users/:id/videos/:pid"
            element={
              <VideoScreen
                users={users}
                user={currentUser}
                videos={videos}
                setVideos={setVideos}
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
                setUser={setCurrentUser}
              />
            }
          />
          <Route
            path="/users/:id"
            element={
              <UserPage
                users={users}
                user={currentUser}
                videos={videos}
                setVideos={setVideos}
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
                setUser={setCurrentUser}
              />
            }
          />
          <Route
            path="/video-upload"
            element={<UploadScreen videos={videos} setVideos={setVideos} id={idCounter} setIdCounter={setIdCounter} user={currentUser} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
