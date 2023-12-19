import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    // Simple validation for demonstration purposes
    if (!email || !password) {
      setError('Email and password are required');
    } else {
      try {
        // Get CSRF token from meta tag
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

        // Include CSRF token in the headers
        const response = await axios.post('http://127.0.0.1:8000/api/login', {
          email,
          password,
        }, {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken,
          },
        });

        // Destructure user and token from the response
        const { user, token } = response.data;

        // Store user information and token in session storage
        sessionStorage.setItem('userId', user.user_id);
        sessionStorage.setItem('userRole', user.role_id);
        sessionStorage.setItem('userName', user.name);
        sessionStorage.setItem('userToken', token);
        sessionStorage.setItem('isLoggedin','true');

        // Clear any previous error
        setError('');

        // Redirect based on the user's role
        if (user.role_id === 1) {
          navigate('/');
        } else if (user.role_id === 4) {
          navigate('/dashboard');
        }

      } catch (error) {
        // Handle login error
        setError('Invalid email or password');
      }
    }
  };

  return (
    <>
      <Header />
      <div className="auth-container">
        <h2>Login</h2>
        <form onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <button type="submit">Login</button>
        </form>
        {error && <p id="error-message">{error}</p>}
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </>
  );
};

export default Login;
