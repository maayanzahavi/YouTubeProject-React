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
          <Route path="/" element={<Navigate to="/YouTube/home" />} />
          <Route path="/YouTube/login-email" element={<LoginEmail />} />
          <Route path="/YouTube/login-password" element={<LoginPassword />} />
          <Route path="/YouTube/signup-name" element={<SignUpName />} />
          <Route path="/YouTube/signup-email" element={<SignUpEmail />} />
          <Route path="/YouTube/signup-password" element={<SignUpPassword />} />
          <Route path="/YouTube/signup-display" element={<SignUpDisplay />} />
          <Route path="/YouTube/home" element={<HomePage isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
          <Route
            path="/YouTube/trending"
            element={<TrendingVideosPage isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />}
          />
          <Route
            path="/YouTube/users/:id/videos/:pid"
            element={<VideoScreen isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />}
          />
          <Route
            path="/YouTube/users/:id/videos"
            element={<UserPage isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />}
          />
          <Route path="/YouTube/users/:id/account" element={<EditUser />} />
          <Route path="/YouTube/users/:id/video-upload" element={<UploadScreen />} />
          <Route path="/YouTube/users/:id/videos/:pid/edit" element={<EditScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
