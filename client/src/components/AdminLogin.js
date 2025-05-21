"use client"

import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { adminLogin } from "../api/api"
import "../styles/AdminLogin.css"

const AdminLogin = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Add animation class after component mounts
    setIsLoaded(true)

    // Create animated background elements
    const createBackgroundElements = () => {
      const container = document.querySelector(".animated-background")
      if (!container) return

      for (let i = 0; i < 15; i++) {
        const element = document.createElement("div")
        element.classList.add("animated-element")
        
        // Randomize size
        const size = Math.floor(Math.random() * 100) + 50
        element.style.width = `${size}px`
        element.style.height = `${size}px`
        
        // Randomize position
        element.style.left = `${Math.random() * 100}%`
        element.style.top = `${Math.random() * 100}%`
        
        // Randomize animation
        element.style.animationDuration = `${Math.random() * 20 + 10}s`
        element.style.animationDelay = `${Math.random() * 5}s`
        
        container.appendChild(element)
      }
    }

    createBackgroundElements()
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoggingIn(true)
    setError("")

    try {
      const data = await adminLogin(username, password)
      localStorage.setItem("token", data.token)

      // Add a slight delay for better UX
      setTimeout(() => {
        navigate("/admin-dashboard")
      }, 500)
    } catch (error) {
      setError("Login failed. Please check your credentials.")
      setIsLoggingIn(false)
    }
  }

  return (
    <div className="admin-login">
      <div className="animated-background"></div>
      
      <div className={`admin-login__container ${isLoaded ? "admin-login__fade-in" : ""}`}>
        <div className="admin-login__card">
          <div className="admin-login__header">
            <div className="admin-login__logo-container">
              <div className="admin-login__logo">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
              </div>
            </div>
            <h1 className="admin-login__title">Admin Portal</h1>
            <p className="admin-login__subtitle">Access the library management dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="admin-login__form">
            <div className="admin-login__form-group">
              <label htmlFor="username" className="admin-login__label">
                Username
              </label>
              <div className="admin-login__input-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="admin-login__input-icon"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <input
                  id="username"
                  type="text"
                  className="admin-login__input"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <span className="admin-login__input-focus-effect"></span>
              </div>
            </div>

            <div className="admin-login__form-group">
              <label htmlFor="password" className="admin-login__label">
                Password
              </label>
              <div className="admin-login__input-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="admin-login__input-icon"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <input
                  id="password"
                  type="password"
                  className="admin-login__input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span className="admin-login__input-focus-effect"></span>
              </div>
            </div>

            <div className="admin-login__options">
              <div className="admin-login__remember-me">
                <input type="checkbox" id="remember" className="admin-login__checkbox" />
                <label htmlFor="remember" className="admin-login__checkbox-label">
                  <span className="admin-login__checkbox-custom"></span>
                  Remember me
                </label>
              </div>
              <a href="#" className="admin-login__forgot-password">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className={`admin-login__button ${isLoggingIn ? "admin-login__button--loading" : ""}`}
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <span className="admin-login__button-content">
                  <span className="admin-login__spinner"></span>
                  <span>Authenticating...</span>
                </span>
              ) : (
                <span className="admin-login__button-content">
                  <span>Login to Dashboard</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                    <polyline points="10 17 15 12 10 7"></polyline>
                    <line x1="15" y1="12" x2="3" y2="12"></line>
                  </svg>
                </span>
              )}
            </button>

            {error && (
              <div className="admin-login__error-message">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <span>{error}</span>
              </div>
            )}
          </form>

          <div className="admin-login__back-link">
            <a href="/" className="admin-login__back-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              <span>Back to Home</span>
            </a>
          </div>
          
          <div className="admin-login__decoration">
            <div className="admin-login__decoration-circle admin-login__decoration-circle--1"></div>
            <div className="admin-login__decoration-circle admin-login__decoration-circle--2"></div>
            <div className="admin-login__decoration-circle admin-login__decoration-circle--3"></div>
          </div>
        </div>
        
        <div className="admin-login__card-glow"></div>
      </div>
    </div>
  )
}

export default AdminLogin
