import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './VideoUpload.css';

const VideoUpload = ({ user }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [selectedImg, setSelectedImg] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [previewVideo, setPreviewVideo] = useState(null);

  const navigate = useNavigate();

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setSelectedVideo(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewVideo(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImg(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImg(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = (inputId) => {
    document.getElementById(inputId).click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !selectedVideo || !selectedImg) {
      setError('Please fill in all fields and upload both a video and an image.');
      return;
    }

    const newVideo = {
      title: title,
      description: description,
      img: previewImg,
      video: previewVideo,
      owner: user.email
    };


    try {
      const res = await fetch(`http://localhost:8200/api/users/${user.email}/videos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newVideo)
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json();
      navigate(`/home`);
    } catch (error) {
      console.error('An error occurred. Please try again later.', error);
      setError('An error occurred while uploading the video. Please try again later.');
    }
  };

  return (
    <div className="video-upload-container">
      <div className="video-upload-box">
        <button className="close-button" onClick={() => navigate('/home')}>
          &times;
        </button>
        <h2 className="video-upload-title">Upload a Video</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="video-upload-form">
          <div className="left-section">
            <div className="upload-input-group">
              <Link
                to="#"
                className="upload-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleUploadClick('video-file');
                }}
              >
                Choose Video
              </Link>
              <div className="video-box">
                {previewVideo && (
                  <video controls className="video-preview">
                    <source src={previewVideo} type="video/mp4" />
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
                  handleUploadClick('img-file');
                }}
              >
                Choose Thumbnail
              </Link>
              <div className="image-box">
                {previewImg && <img src={previewImg} alt="Thumbnail Preview" className="image-preview" />}
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
              <input
                type="text"
                id="video-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
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
