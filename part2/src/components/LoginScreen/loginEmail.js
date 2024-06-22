// loginEmail component is the screen for putting the user email for log in
import React, { useState } from 'react';
import './login.css';
import logo from '../../assets/logo.png';
import { useNavigate, Link } from 'react-router-dom';

function LoginEmail({ users }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleNext = (e) => {
    e.preventDefault();
    const user = users.find((user) => user.email === email);
    if (user) {
      // If the user was found, move on to password page
      navigate('/login-password', { state: { user } });
    } else {
      // Otherwise, send error
      setError('Email not found');
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
