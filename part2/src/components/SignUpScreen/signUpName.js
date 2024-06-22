// Name details in sign up
import React, { useState } from 'react';
import './signUp.css';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';

function SignUpName() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');

  // Make sure the inputs are valid and move on to the next step
  const handleNext = (e) => {
    e.preventDefault();
    if (validateInput(firstName) && validateInput(lastName)) {
      navigate('/signup-email', { state: { firstName, lastName } });
    } else {
      setError('Only characters are allowed');
    }
  };

  const validateInput = (value) => /^[a-zA-Z]+$/.test(value);

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-content">
          <div className="login-image">
            <div className="login-logo-container">
              <img src={logo} alt="Logo" className="login-logo" />
            </div>
            <div className="login-title-container">
              <h1 className="login-title">Create your account</h1>
              <p className="login-subtitle">Enter your name</p>
            </div>
          </div>
          <div className="login-form">
            <form onSubmit={handleNext}>
              <div className="input-group">
                <label htmlFor="first_name">First name</label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="last_name">Last name</label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
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

export default SignUpName;
