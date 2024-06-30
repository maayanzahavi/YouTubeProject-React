import React, { useState } from 'react';
import './login.css';
import logo from '../../assets/logo.png';
import { useNavigate, Link, useParams } from 'react-router-dom';

function LoginEmail() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleNext = async (e) => {
    e.preventDefault();
    setError('');
    try {
      console.log('Sending request to server...');
      const res = await fetch(`http://localhost:8200/api/users/${email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Response received:', res);

      if (res.status === 404) {
        setError('User not found');
      } else if (!res.ok) {
        throw new Error('Network response was not ok');
      } else {
        const data = await res.json();
        console.log('Data received:', data);
        navigate('/login-password', { state: { user: data } });
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      setError('An error occurred. Please try again later.');
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
              <h1 className="login-title">Sign In</h1>
              <p className="login-subtitle">to continue</p>
            </div>
          </div>
          <div className="login-form">
            <form onSubmit={handleNext}>
              <div className="input-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              {error && <p className="error-message">{error}</p>}
              <div className="help-link">
                <Link to="#">Forgot email?</Link>
              </div>
              <button type="submit" className="red-button">
                Next
              </button>
              <div className="create-account">
                <Link to="/signup-name" className="create-account-link">
                  Create account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginEmail;
