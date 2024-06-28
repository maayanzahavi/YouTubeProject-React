import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './VideoContent.css';
import VideoAction from './VideoAction/VideoAction';
import CommentSection from './CommentSection/CommentSection';
import ProfilePicture from '../../ProfilePicture/ProfilePicture';
import ShareWindow from './ShareWindow/ShareWindow';
import ShareIcon from '../../../assets/icons/ShareIcon';
import DotsIcon from '../../../assets/icons/ThreeDots';
import EditIcon from '../../../assets/icons/EditIcon';
import DeleteIcon from '../../../assets/icons/DeleteIcon';
import IsLikedIcon from '../../../assets/icons/isLikedIcon';

const VideoContent = ({ video, owner, currentUser }) => {
  const navigate = useNavigate();
  const [id, setId] = useState(video.owner);
  const [pid, setPid] = useState(video._id);
  const [isLiked, setIsLiked] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isShareWindowVisible, setIsShareWindowVisible] = useState(false);
console.log("current user", currentUser);

  useEffect(() => {
    const isLikedByUser = async () => {
      try {
        const res = await fetch(`http://localhost:8200/api/users/${id}/videos/${pid}/likes`, {
          method: 'GET',
          // headers: {
          //   'Content-Type': 'application/json',
          //   'Authorization': `Bearer ${currentUser.token}` // Ensure to pass the token here
          // }
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userEmail: currentUser.email })
        });
        const data = await res.json();
        setIsLiked(data);
      } catch (error) {
        console.error('Error fetching is liked:', error);
      }
    };
    if (currentUser) {
      isLikedByUser();
    }
  }, [id, pid, currentUser]);

  // When clicking like
  const handleLike = async (e) => {
    e.preventDefault();
    setIsLiked(!isLiked);

    // If the user is not logged in, go to login screen
    if (!currentUser) {
      navigate('/login-email');
      return;
    }

    // Update likes
    try {
      const res = await fetch(`http://localhost:8200/api/users/${id}/videos/${pid}/likes`, {
        method: 'PATCH',
        // headers: {
        //   'Content-Type': 'application/json',
        //   'Authorization': `Bearer ${currentUser.token}` // Ensure to pass the token here
        // },
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userEmail: currentUser.email })
      });
    } catch (error) {
      console.error('Error setting likes:', error);
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  // Handle video edit
  const handleEdit = () => {
    navigate(`/home/api/users/${video.owner}/videos/${video._id}/edit`);
  };

  // Handles video delete
  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:8200/api/users/${id}/videos/${pid}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.token}` // Ensure to pass the token here
        }
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      navigate(`/home`);
    } catch (error) {
      console.error('An error occurred while deleting the video. Please try again later.', error);
    }
  };

  const handleShare = () => {
    setIsShareWindowVisible(true);
  };

  const closeShareWindow = () => {
    setIsShareWindowVisible(false);
  };

  return (
    <div className="video-page-container">
      <div className="video-wrapper">
        <div className="video-element-wrapper">
          <video controls className="video-element">
            <source src={video.video} type="video/mp4" />
            <p>Your browser does not support the video tag.</p>
            <img src="path/to/fallback-image.jpg" alt="Fallback Image" />
          </video>
        </div>
        <div className="video-header">
          <h1 className="video-page-title">{video.title}</h1>
          <div className="video-actions">
            <VideoAction icon={<ShareIcon />} label="Share" action={handleShare} />
            <VideoAction icon={<IsLikedIcon isLiked={isLiked} />} label={`${video.likes} likes`} action={handleLike} />
            <div className="dropdown-container" style={{ position: 'relative' }}>
              <button className="three-dots" onClick={toggleDropdown}>
                <DotsIcon />
              </button>
              {dropdownVisible && (
                <div className="dropdown-menu">
                  <button onClick={handleEdit}>
                    <div className="action-icon"><EditIcon /></div>
                    Edit
                  </button>
                  <button onClick={handleDelete} className="delete-button">
                    <div className="action-icon"><DeleteIcon /></div>
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="video-owner-details">
          {owner && <ProfilePicture user={owner} />}
          <div className="owner-info">
            <span className="owner-name">{owner ? owner.displayName : 'Unknown'}</span>
            <span className="video-views">{video.views} views</span>
          </div>
        </div>
        <p className="video-description">{video.description}</p>
      </div>
      <CommentSection video={video} user={currentUser} />
      {isShareWindowVisible && <ShareWindow onClose={closeShareWindow} />}
    </div>
  );
};

export default VideoContent;
