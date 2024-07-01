import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './login.css';
import logo from '../../assets/logo.png';

function LoginPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = location.state || {};
  const [enteredPassword, setEnteredPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  console.log('user', user);

  const handleNext = async (e) => {
    e.preventDefault();
    assignToken();
    navigate('/YouTube/home', { state: { user } });
  };

  const assignToken = async () => {
    try {
      const res = await fetch(`/api/tokens`, {
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
              <h1 className="login-title">Enter your password</h1>
            </div>
          </div>
          <div className="login-form">
            <form onSubmit={handleNext}>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={enteredPassword}
                  onChange={(e) => setEnteredPassword(e.target.value)}
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
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPassword;
