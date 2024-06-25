import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './login.css';
import logo from '../../assets/logo.png';

function LoginPassword({ setCurrentUser }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = location.state || {};
  const [enteredPassword, setEnteredPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleNext = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8200/api/users/${user.email}?password=${(enteredPassword)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('token', data.token);
        setCurrentUser(user);
        navigate('/home', { state: { user } });
      } else {
        setError('Password incorrect.');
      }
    } catch (error) {
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
