// Sidebar
import React from 'react';
import Option from './Option/Option';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';
import HomeIcon from '../../../assets/icons/HomeIcon';
import TrendingIcon from '../../../assets/icons/TrendingIcon';
import SubscriptionsIcon from '../../../assets/icons/SubscriptionsIcon';
import YourVideosIcon from '../../../assets/icons/YourVideosIcon';
import HistoryIcon from '../../../assets/icons/HistoryIcon';
import LikeIcon from '../../../assets/icons/LikeIcon';

const Sidebar = ({ logo, onClose, className, user }) => {
  const navigate = useNavigate();
  // When clicking home go to home page
  const handleHome = (e) => {
    navigate('/YouTube/home');
  };

  const handleTrending = (e) => {
    navigate('/YouTube/trending');
  };

  const handleYourVideos = (e) => {
    if (user) {
      navigate(`/YouTube/users/${user.email}/videos`);
    }
  };

  const menuOptions = [
    { icon: <HomeIcon />, text: 'Home', action: handleHome },
    { icon: <TrendingIcon />, text: 'Trending', action: handleTrending },
    { icon: <SubscriptionsIcon />, text: 'Subscriptions' },
    { icon: <HistoryIcon />, text: 'History' },
    { icon: <YourVideosIcon />, text: 'Your videos', action: handleYourVideos },
    { icon: <LikeIcon />, text: 'Liked videos' },
  ];

  return (
    <aside className={`sidebar ${className}`}>
      <button className="close-button" onClick={onClose}>
        ☰
      </button>
      <img src={logo} alt="Logo" className="sidebar-logo" />
      <hr className="devider-line" />
      {menuOptions.map((option, index) => (
        <React.Fragment key={index}>
          <Option icon={option.icon} text={option.text} action={option.action} />
        </React.Fragment>
      ))}
    </aside>
  );
};

export default Sidebar;
