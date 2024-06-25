// Email details in sign up
import React, { useState } from 'react';
import './signUp.css';
import logo from '../../assets/logo.png';
import { useNavigate, useLocation } from 'react-router-dom';

function SignUpEmail({ users }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const { firstName = '', lastName = '' } = location.state || {};

  // When pressing next makes sure the input is valid and moves on the next step
  const handleNext = async (e) => {
    e.preventDefault();

    if (validateEmail(email)) {
      try {
        const res = await fetch(`http://localhost:8200/api/users/${email}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!res.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await res.json();
        if (data) {
          setError('A user with this email already exists.');
        } else {
          navigate('/signup-password', { state: { firstName, lastName, email } });
        }
      } catch (error) {
        setError('Server error. Please try again later.');
      }
    } else {
      setError('Please enter a valid email address.');
    }
  };

  // Make sure an email address is entered
  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
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
              <h1 className="login-title">Use your existing email</h1>
              <p className="login-subtitle">Enter the email address you want to use for your account</p>
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
                <div className="confirmation-text">
                  <p>You'll need to confirm that this email belongs to you</p>
                </div>
              </div>
              {error && <p className="error-message">{error}</p>}
              <button type="submit" className="red-button">
                Next
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpEmail;
