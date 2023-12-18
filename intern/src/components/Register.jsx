import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';

const Register = () => {
  const [username, setUsername] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleDateOfBirthChange = (event) => {
    setDateOfBirth(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();

    // Simple validation for demonstration purposes
    if (!username || !dateOfBirth || !email || !password || !confirmPassword) {
      setError('All fields are required');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Invalid email address');
    } else if (password.length < 6) {
      setError('Password must be at least 6 characters long');
    } else if (password !== confirmPassword) {
      setError('Passwords do not match');
    } else {
      // Set loading state to true to indicate registration in progress
      setIsLoading(true);
      
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/signup', {
          name: username,
          email,
          password,
          birthDate: dateOfBirth,
        }, {
          headers: {
            'Content-Type': 'application/json',
            // You can add other headers if needed
          },
        });
        console.log(username ,email,password,dateOfBirth);
        // Handle the response
        console.log(response.data); // Log the response for debugging
      } catch (error) {
        // Handle errors
        console.error('Registration failed', error);
      } finally {
        // Set loading state back to false whether registration succeeds or fails
        setIsLoading(false);
      }
    }
  };
  return (
    <>
      <Header />
      <div className="auth-container">
        <h2>Register</h2>
        <form onSubmit={handleRegisterSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
          />
          <input
            type="date"
            placeholder="Date of Birth"
            value={dateOfBirth}
            onChange={handleDateOfBirthChange}
          />
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </>
  );
};

export default Register;
