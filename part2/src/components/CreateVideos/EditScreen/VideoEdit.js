// Component for edit videos
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VideoEdit = ({ video, setVideos, onSave }) => {
  const [title, setTitle] = useState(video.title);
  const [description, setDescription] = useState(video.description);
  const [img, setImg] = useState(null);
  const navigate = useNavigate();

  // Changing image
  const handleImageChange = (e) => {
    setImg(e.target.files[0]);
  };

  const handleClose = (e) => {
    navigate(`/home/api/users/${video.owner}/videos/${video._id}`);
  }

  // Updates the video when hitting save
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedVideo = {
      ...video,
      title,
      description,
      img: img ? URL.createObjectURL(img) : video.img,
    };
    setVideos((prevVideos) => prevVideos.map((v) => (v.id === video.id ? updatedVideo : v)));
    onSave(updatedVideo);
  };

  return (
    <div className="video-upload-container">
      <div className="video-upload-box">
        <button className="close-button" onClick={handleClose}>
          &times;
        </button>
        <h2 className="video-upload-title">Edit Video</h2>
        <form onSubmit={handleSubmit} className="video-upload-form">
          <div className="left-section">
            <div className="upload-input-group">
              <div className="video-box">
                {video.video && (
                  <video controls className="video-preview">
                    <source src={video.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            </div>
            <div className="upload-input-group">
              <div
                type="button"
                className="upload-link"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('img-file').click();
                }}
              >
                Choose Thumbnail
              </div>
              <div className="image-box">
                {img ? (
                  <img src={URL.createObjectURL(img)} alt="Thumbnail Preview" className="image-preview" />
                ) : (
                  <img src={video.img} alt="Thumbnail Preview" className="image-preview" />
                )}
              </div>
              <input
                type="file"
                id="img-file"
                accept="image/*"
                onChange={handleImageChange}
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
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default VideoEdit;
