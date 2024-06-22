import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './VideoUpload.css';

const VideoUpload = ({ setVideos, id, setIdCounter, user }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [video, setVideo] = useState(null);
  const [img, setImg] = useState(null);

  const navigate = useNavigate();

  // Set a video
  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

  // Set image
  const handleImageChange = (e) => {
    setImg(e.target.files[0]);
  };

  // Save the video and add it to the video list
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description && video && img && user && user.email) {
      const newVideo = {
        id: id,
        title: title,
        description: description,
        video: URL.createObjectURL(video),
        img: URL.createObjectURL(img),
        owner: user.email,
        views: 0,
        likes: 0,
        comments: [],
      };
      setVideos((prevVideos) => [...prevVideos, newVideo]);
      navigate('/home'); 
    } else {
      console.error('All fields are required and user must be logged in.');
    }
    // Increase id counter
    setIdCounter(id + 1);
  };

  const handleClose = () => {
    navigate('/home');
  };

  return (
    <div className="video-upload-container">
      <div className="video-upload-box">
        <button className="close-button" onClick={handleClose}>
          &times;
        </button>
        <h2 className="video-upload-title">Upload a Video</h2>
        <form onSubmit={handleSubmit} className="video-upload-form">
          <div className="left-section">
            <div className="upload-input-group">
              <Link
                to="#"
                className="upload-link"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('video-file').click();
                }}
              >
                Choose Video
              </Link>
              <div className="video-box">
                {video && (
                  <video controls className="video-preview">
                    <source src={URL.createObjectURL(video)} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
              <input
                type="file"
                id="video-file"
                accept="video/*"
                onChange={handleVideoChange}
                required
                style={{ display: 'none' }}
              />
            </div>
            <div className="upload-input-group">
              <Link
                to="#"
                className="upload-link"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('img-file').click();
                }}
              >
                Choose Thumbnail
              </Link>
              <div className="image-box">
                {img && <img src={URL.createObjectURL(img)} alt="Thumbnail Preview" className="image-preview" />}
              </div>
              <input
                type="file"
                id="img-file"
                accept="image/*"
                onChange={handleImageChange}
                required
                style={{ display: 'none' }}
              />
            </div>
          </div>
          <div className="right-section">
            <div className="upload-input-group">
              <label htmlFor="video-title">Title:</label>
              <input type="text" id="video-title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="upload-input-group">
              <label htmlFor="video-description">Description:</label>
              <textarea
                id="video-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
          </div>
          <button type="submit" className="upload-button">
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default VideoUpload;
