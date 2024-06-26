import React, { useState, useEffect } from 'react';
import './Navbar.css';
import './Toggle/Toggle.css'; 
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import darkmodeLogo from '../../assets/darkmode_logo.png';
import Sidebar from './Sidebar/Sidebar';
import ProfilePicture from '../ProfilePicture/ProfilePicture';
import Toggle from './Toggle/Toggle'; 
import SearchBar from './SearchBar';
import UserIcon from '../../assets/icons/UserIcon';
import VideoIcon from '../../assets/icons/VideoIcon';
import { jwtDecode } from 'jwt-decode';

const Navbar = ({ user, setUser, isDarkMode, setIsDarkMode, doSearch }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        if (decodedUser) {
          setCurrentUser(decodedUser.email);
        }
        console.log("Decoded User 1:", decodedUser);
      } catch (error) {
        console.log('Invalid token');
      }
    } else {
      console.log("No token found");
    }
  }, [token]);  

  const [showDetails, setShowDetails] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [currentLogo, setCurrentLogo] = useState(isDarkMode ? darkmodeLogo : logo);

  // Handle sidebar showing 
  const handleSidebarToggle = (e) => {
    e.preventDefault();
    setShowSidebar(!showSidebar);
  };

  // When clicking the profile pic
  const handleProfileClick = () => {
    setShowDetails(!showDetails);
  };

  // Sign out takes you to the home page
  const handleSignOut = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    setUser(null);
    navigate('/home');
  };

  // Switch user takes you to the login screen
  const handleSwitchUser = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    setUser(null);
    navigate('/login-email');
  };

  const handleVideoUploadClick = () => {
    navigate('/video-upload');
  };

  // Clicking on the logo takes you to home page
  const handleLogoClick = () => {
    navigate('/home');
  };

  // Dark mode toggle 
  const handleModeToggle = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      setCurrentLogo(darkmodeLogo);
    } else {
      setCurrentLogo(logo);
    }
  };
  
  return (
    <header className="navbar">
      <div className="navbar-left">
        <button className="menu-button" onClick={handleSidebarToggle}>
          ☰
        </button>
        <img src={currentLogo} alt="YouTube Logo" className="logo" onClick={handleLogoClick} />
        <Toggle handleChange={handleModeToggle} isChecked={isDarkMode} />
      </div>
      <div className="navbar-center">
        <SearchBar doSearch={doSearch} />
      </div>
      <div className="navbar-right">
        {currentUser ? (
          <>
            <div alt="Upload Video" className="video-upload-icon" onClick={handleVideoUploadClick}>
              <VideoIcon />
            </div>
            <div className="profile-container" onClick={handleProfileClick}>
              <div className="profile-info">
                <ProfilePicture user={currentUser} />
                <div className="profile-greeting">Hello {currentUser.firstName}!</div>
              </div>
              {showDetails && (
                <div className="profile-details">
                  <p className="displayname">{currentUser.displayName}</p>
                  <ProfilePicture user={currentUser} />
                  <p className="name">
                    {currentUser.firstName} {currentUser.lastName}
                  </p>
                  <p className="email">{currentUser.email}</p>
                  <hr className="divider-line"></hr>
                  <div>
                    <div className="signout" onClick={handleSignOut}>
                      Sign out
                    </div>
                  </div>
                  <div>
                    <div className="signin" onClick={handleSwitchUser}>
                      Switch user
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="profile-container" onClick={handleProfileClick}>
            <div className="user-pic"><UserIcon /></div>
            <div className="profile-greeting">Sign in</div>
            {showDetails && (
              <div className="profile-details">
                <Link to="/login-email" className="signin">
                  Sign in
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
      <Sidebar logo={currentLogo} className={showSidebar ? 'show' : ''} onClose={handleSidebarToggle} />
    </header>
  );
};

export default Navbar;
