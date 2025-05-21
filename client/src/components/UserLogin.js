import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../api/api';
import '../styles/UserLogin.css';

const UserLogin = () => {
  const [user, setUser] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Add animation class after component mounts
    setIsLoaded(true);
    
    // Initialize floating elements
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach(element => {
      element.style.animationDuration = `${8 + Math.random() * 7}s`;
      element.style.animationDelay = `${Math.random() * 2}s`;
    });
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await userLogin(user.username, user.password);
      if (response.token) {
        localStorage.setItem('username', user.username);
        navigate('/homepage');
      } else {
        setError('Login failed');
      }
    } catch (error) {
      setError('Invalid credentials');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="user-login-container">
      <div className="background-gradient"></div>
      
      {/* Floating decorative elements */}
      <div className="floating-elements">
        <div className="floating-element element-1"></div>
        <div className="floating-element element-2"></div>
        <div className="floating-element element-3"></div>
        <div className="floating-element element-4"></div>
      </div>
      
      <div className={`user-login-card ${isLoaded ? 'card-loaded' : ''}`}>
        <div className="card-header">
          <div className="logo">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
          </div>
          <h2 className="user-login-header">Welcome Back</h2>
          <p className="login-subtitle">Sign in to access your library account</p>
        </div>
        
        {error && (
          <div className="error-container">
            <div className="error-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <p className="user-login-error">{error}</p>
          </div>
        )}
        
        <form className="user-login-form" onSubmit={handleSubmit}>
          <div className="user-login-form-group">
            <label htmlFor="username" className="user-login-label">Username</label>
            <div className="input-container">
              <div className="input-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <input
                type="text"
                name="username"
                id="username"
                className="user-login-input"
                placeholder="Enter your username"
                value={user.username}
                onChange={handleChange}
                required
              />
              <div className="input-focus-indicator"></div>
            </div>
          </div>
          
          <div className="user-login-form-group">
            <label htmlFor="password" className="user-login-label">Password</label>
            <div className="input-container">
              <div className="input-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <input
                type="password"
                name="password"
                id="password"
                className="user-login-input"
                placeholder="Enter your password"
                value={user.password}
                onChange={handleChange}
                required
              />
              <div className="input-focus-indicator"></div>
            </div>
          </div>
          
          <div className="forgot-password">
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/forgot-password'); }}>
              Forgot password?
            </a>
          </div>
          
          <button 
            type="submit" 
            className={`user-login-button ${isSubmitting ? 'submitting' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="spinner"></div>
            ) : (
              <>
                <span>Login</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </>
            )}
          </button>
        </form>
        
        <div className="user-login-footer">
          <p>Don't have an account?</p>
          <button 
            className="user-login-register-link" 
            onClick={() => navigate('/signup')}
          >
            Register
          </button>
        </div>
        
        <div className="card-decoration">
          <div className="decoration-circle circle-1"></div>
          <div className="decoration-circle circle-2"></div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
