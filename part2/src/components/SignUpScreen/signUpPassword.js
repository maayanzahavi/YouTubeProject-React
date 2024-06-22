// Password details in sign up
import React, { useState } from 'react';
import './signUp.css';
import logo from '../../assets/logo.png';
import { useNavigate, useLocation } from 'react-router-dom';

function SignUpPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const { firstName = '', lastName = '', email = '' } = location.state || {};
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Make sure that password is strong enough and moves on to the next step
  const handleNext = (e) => {
    e.preventDefault();
    if (!(validatePassword(password) && validatePassword(passwordConfirmation))) {
      setError(
        'Your password must be at least 8 characters long, and include uppercase and lowercase letters, numbers, and special characters.',
      );
    } else if (!(password === passwordConfirmation)) {
      setError('Your passwords do not match.');
    } else {
      navigate('/signup-display', { state: { firstName, lastName, email, password } });
    }
  };

  // Check if the password is strong enough
  const validatePassword = (value) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
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
              <h1 className="login-title">Create a strong password</h1>
              <p className="login-subtitle">
                In order to create a strong password, you need to combine letters, numbers, and symbols
              </p>
            </div>
          </div>
          <div className="login-form">
            <form onSubmit={handleNext}>
              <div className="input-group">
                <label htmlFor="password">Enter password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="confirm_password">Confirm your password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="confirm_password"
                  name="confirm_password"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  required
                />
              </div>
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="show-password"
                  name="show-password"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
                <label htmlFor="show-password">Show my password</label>
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

export default SignUpPassword;
