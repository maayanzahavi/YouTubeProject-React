import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import './EditUser.css';

const EditUser = ({ onSave }) => {
  const { id } = useParams();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [photo, setPhoto] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await fetch(`http://localhost:8200/api/users/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await res.json();
        setUser(data);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setEmail(data.email);
        setDisplayName(data.displayName);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleClose = (e) => {
    navigate(`/home/api/users/${user.email}/videos`);
  }

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = {
      ...user,
      firstName,
      lastName,
      email,
      displayName,
      photo: photo ? URL.createObjectURL(photo) : user.photo,
    };
    setUser(updatedUser);
    onSave(updatedUser);
  };

  return (
    <div className="account-edit-user-container">
      <div className="account-edit-user-box">
        <button className="account-close-button" onClick={handleClose}>
          &times;
        </button>
        <h2 className="account-edit-user-title">Edit User Information</h2>
        <form onSubmit={handleSubmit} className="account-edit-user-form">
          <div className="account-left-section">
            <div className="account-upload-input-group">
              <div className="account-photo-box">
                {photo ? (
                  <img src={URL.createObjectURL(photo)} alt="Profile Preview" className="account-photo-preview" />
                ) : (
                  <img src={user.photo} alt="Profile Preview" className="account-photo-preview" />
                )}
              </div>
              <div
                type="button"
                className="account-upload-link"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('photo-file').click();
                }}
              >
                Choose Profile Photo
              </div>
              <input
                type="file"
                id="photo-file"
                accept="image/*"
                onChange={handlePhotoChange}
                style={{ display: 'none' }}
              />
            </div>
          </div>
          <div className="account-right-section">
            <div className="account-upload-input-group">
              <label htmlFor="first-name">First Name:</label>
              <input
                type="text"
                id="first-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="account-upload-input-group">
              <label htmlFor="last-name">Last Name:</label>
              <input
                type="text"
                id="last-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="account-upload-input-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="account-upload-input-group">
              <label htmlFor="display-name">Display Name:</label>
              <input
                type="text"
                id="display-name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit" className="account-upload-button">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
