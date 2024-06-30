// Display details in sign up (display name and photo)
import React, { useState } from 'react';
import './signUp.css';
import logo from '../../assets/logo.png';
import { useNavigate, useLocation } from 'react-router-dom';

function SignUpDisplay() {
  const navigate = useNavigate();
  const location = useLocation();
  const { firstName = '', lastName = '', email = '', password = '' } = location.state || {};

  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleNext = async (e) => {
    e.preventDefault();
    if (!displayName || !selectedFile) {
      setError('Please provide both a display name and a photo.');
    } else {
      const user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        displayName: displayName,
        photo: preview,
        likedVideos: [],
      };

      try {
        const res = await fetch('http://localhost:8200/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });

        if (!res.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await res.json();
        localStorage.setItem('token', data.token);
        assignToken(user);
        navigate('/home', { state: { user: data } });
      } catch (error) {
        setError('An error occurred. Please try again later.');
      }
    }
  };

  const assignToken = async (user) => {
    try {
      const res = await fetch(`http://localhost:8200/api/tokens`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user.email, password: user.password }),
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json();
      localStorage.setItem('token', data.token);
      console.log('recieved token', data.token);
      console.log('local storage token', localStorage.getItem('token'));
    } catch (error) {
      console.error('An error occurred. Please try again later.', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-content">
          <div className="login-image">
            <div className="login-logo-container">
              <img src={logo} alt="Logo" className="login-logo" />
            </div>
            <div className="login-title-container">
              <h1 className="login-title">Display yourself</h1>
              <p className="login-subtitle">Choose your display name and picture</p>
            </div>
          </div>
          <div className="login-form">
            <form onSubmit={handleNext}>
              <div className="input-group">
                <label htmlFor="display_name">Display name</label>
                <input
                  type="text"
                  id="display_name"
                  name="display_name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                  accept="image/*"
                />
                <p className="upload-text" onClick={handleUploadClick}>
                  Upload Photo
                </p>
                {preview && <img src={preview} alt="Preview" className="signup-image-preview" />}
              </div>
              {error && <p className="error-message">{error}</p>}
              <button type="submit" className="red-button">
                Done
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpDisplay;
