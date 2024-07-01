import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditUser.css';

const EditUser = () => {
  const { id } = useParams();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [photo, setPhoto] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found');
          navigate('/');
          return;
        }

        const res = await fetch(`/api/users/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        const loggedInUserEmail = JSON.parse(atob(token.split('.')[1])).email;

        if (loggedInUserEmail !== data.email) {
          setError('You are not authorized to edit this profile.');
          navigate('/');
          return;
        }

        setUser(data);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setEmail(data.email);
        setDisplayName(data.displayName);
      } catch (error) {
        setError('Error fetching user details');
      }
    };

    fetchUserDetails();
  }, [id, navigate]);

  if (!user && !error) {
    return <div>Loading...</div>;
  }

  const handleClose = () => {
    navigate(-1);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhoto(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedUser = {
      firstName,
      lastName,
      email,
      displayName,
      photo: photo ? photo : user.photo,
    };

    try {
      const res = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(updatedUser),
      });

      if (res.ok) {
        const updatedUserData = await res.json();
        setUser(updatedUserData);
        console.log('User details updated:', updatedUserData);
        navigate(-1); // Navigate back to the previous page
      } else {
        const errorText = await res.text();
        console.error('Error updating user details:', errorText);
        setError('Error updating user details');
      }
    } catch (error) {
      console.error('Error updating user details:', error);
      setError('Error updating user details');
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }

      localStorage.removeItem('token');
      navigate('/');
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Error deleting user');
    }
  };

  return (
    <div className="account-edit-user-container">
      <div className="account-edit-user-box">
        <button className="account-close-button" onClick={handleClose}>
          &times;
        </button>
        <h2 className="account-edit-user-title">Edit User Information</h2>
        {error && <p className="error-message">{error}</p>}
        {!error && (
          <form onSubmit={handleSubmit} className="account-edit-user-form">
            <div className="account-left-section">
              <div className="account-upload-input-group">
                <div className="account-photo-box">
                  {photo ? (
                    <img src={photo} alt="Profile Preview" className="account-photo-preview" />
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
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
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
              <div className="button-group">
                <button type="submit" className="account-upload-button">
                  Save
                </button>
                <button type="button" className="account-delete-button" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditUser;
