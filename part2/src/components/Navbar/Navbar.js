// Navigation bar
import React, { useState } from 'react';
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


const Navbar = ({ user, setUser, isDarkMode, setIsDarkMode, doSearch }) => {
  const navigate = useNavigate();

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
    setUser(null);
    navigate('/home');
  };

  // Swich user takes you to the login screen
  const handleSwichUser = () => {
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

  // Drak mode toggle 
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
        {user ? (
          <>
          <div alt="Upload Video" className="video-upload-icon" onClick={handleVideoUploadClick}>
            <VideoIcon/>
          </div>
            <div className="profile-container" onClick={handleProfileClick}>
              <div className="profile-info">
                <ProfilePicture user={user} />
                <div className="profile-greeting">Hello {user.firstName}!</div>
              </div>
              {showDetails && (
                <div className="profile-details">
                  <p className="displayname">{user.displayName}</p>
                  <ProfilePicture user={user} />
                  <p className="name">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="email">{user.email}</p>
                  <hr className="devider-line"></hr>
                  <div>
                    <div className="signout" onClick={handleSignOut}>
                      Sign out
                    </div>
                  </div>
                  <div>
                    <div className="signin" onClick={handleSwichUser}>
                      Switch user
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="profile-container" onClick={handleProfileClick}>
            <div className="user-pic"><UserIcon/></div>
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
