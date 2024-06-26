import React, { useState } from 'react';
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

const VideoContent = ({ initialVideo, owner, users, currentUser, setVideos }) => {
  const navigate = useNavigate();
  const [id, setId] = useState(initialVideo.owner);
  const [pid, setPid] = useState(initialVideo._id);
  const [video, setVideo] = useState(initialVideo);
  const [currentLikeIcon, setCurrentLikeIcon] = useState(
    currentUser && currentUser.likedVideos.includes(initialVideo.id)
  );
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isShareWindowVisible, setIsShareWindowVisible] = useState(false);
  
  // Handles likes
  const handleLike = (e) => {
    e.preventDefault();

    // If the user is not logged in, go to login screen
    if (!currentUser) {
      navigate('/login-email');
      return;
    }

    const isLiked = currentUser.likedVideos.includes(video.id);
    let updatedLikes;

    // Check if the video is currently liked by the user or not
    if (isLiked) {
      updatedLikes = video.likes - 1;
      currentUser.likedVideos = currentUser.likedVideos.filter((id) => id !== video.id);
    } else {
      updatedLikes = video.likes + 1;
      currentUser.likedVideos.push(video.id);
    }

    // Set the new number of likes for the video
    const updatedVideo = { ...video, likes: updatedLikes };
    setVideo(updatedVideo);
    setCurrentLikeIcon(!currentLikeIcon);
    setVideos((prevVideos) => prevVideos.map((v) => (v.id === video.id ? updatedVideo : v)));
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
          'Content-Type': 'application/json'
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
            <VideoAction icon={<IsLikedIcon isLiked={currentLikeIcon} />} label={`${video.likes} likes`} action={handleLike} />
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
      <CommentSection video={video} user={currentUser} setVideos={setVideos} users={users} />
      {isShareWindowVisible && <ShareWindow onClose={closeShareWindow} />}
    </div>
  );
};

export default VideoContent;
