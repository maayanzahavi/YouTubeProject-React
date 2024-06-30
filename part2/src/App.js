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
import UploadScreen from './components/CreateVideos/UploadScreen/UploadScreen';
import UserPage from './components/UserPage/UserPage';
import EditUser from './components/UserPage/EditUser/EditUser';
import EditScreen from './components/CreateVideos/EditScreen/EditScreen';
import TrendingVideosPage from './components/TrendingVideosPage/TrendingVideosPage';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className="App" data-theme={isDarkMode ? 'dark' : 'light'}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/login-email" element={<LoginEmail />} />
          <Route path="/login-password" element={<LoginPassword />} />
          <Route path="/signup-name" element={<SignUpName />} />
          <Route path="/signup-email" element={<SignUpEmail />} />
          <Route path="/signup-password" element={<SignUpPassword />} />
          <Route path="/signup-display" element={<SignUpDisplay />} />
          <Route path="/home" element={<HomePage isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
          <Route
            path="/home/trending"
            element={<TrendingVideosPage isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />}
          />
          <Route
            path="/home/api/users/:id/videos/:pid"
            element={<VideoScreen isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />}
          />
          <Route
            path="/home/api/users/:id/videos"
            element={<UserPage isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />}
          />
          <Route path="/home/api/users/:id/account" element={<EditUser />} />
          <Route path="/video-upload" element={<UploadScreen />} />
          <Route path="/home/api/users/:id/videos/:pid/edit" element={<EditScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
