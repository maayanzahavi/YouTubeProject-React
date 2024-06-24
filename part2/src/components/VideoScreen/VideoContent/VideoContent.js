import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './VideoContent.css';
import VideoAction from './VideoAction/VideoAction';
import CommentSection from './CommentSection/CommentSection';
import VideoEdit from '../../UploadScreen/VideoCreate/VideoEdit';
import ProfilePicture from '../../ProfilePicture/ProfilePicture';
import ShareWindow from './ShareWindow/ShareWindow';
import ShareIcon from '../../../assets/icons/ShareIcon';
import DotsIcon from '../../../assets/icons/ThreeDots';
import EditIcon from '../../../assets/icons/EditIcon';
import DeleteIcon from '../../../assets/icons/DeleteIcon';
import IsLikedIcon from '../../../assets/icons/isLikedIcon';

const VideoContent = ({ initialVideo, users, currentUser, setVideos }) => {
  const navigate = useNavigate();
  const [video, setVideo] = useState(initialVideo);
  const [currentLikeIcon, setCurrentLikeIcon] = useState(
    currentUser && currentUser.likedVideos.includes(initialVideo.id)
  );
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isShareWindowVisible, setIsShareWindowVisible] = useState(false);

  const owner = users.find((user) => user.email === video.owner);

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
    setIsEditing(true);
    setDropdownVisible(false);
  };

  // Updates the video after video edit
  const handleSave = (updatedVideo) => {
    setVideo(updatedVideo);
    setVideos((prevVideos) => prevVideos.map((v) => (v.id === updatedVideo.id ? updatedVideo : v)));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  // Handles video delete
  const handleDelete = () => {
    setVideos((prevVideos) => prevVideos.filter((v) => v.id !== video.id));
    navigate('/home');
  };

  const handleShare = () => {
    setIsShareWindowVisible(true);
  };

  const closeShareWindow = () => {
    setIsShareWindowVisible(false);
  };

  if (isEditing) {
    return <VideoEdit video={video} setVideos={setVideos} onSave={handleSave} onCancel={handleCancel} />;
  }

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
