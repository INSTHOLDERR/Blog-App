import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const changeInputHandler = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', userData);
      const { token, id, name } = response.data;

      const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000; 
      localStorage.setItem('token', token);
      localStorage.setItem('userId', id);
      localStorage.setItem('tokenExpiration', expirationTime);
      const isLoggedIn = true;
      toast.success('Login successful! Redirecting...');
      const timeout = setTimeout(() => {
        navigate('/');
      }, 10); 

      return () => clearTimeout(timeout); 
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(`Login failed: ${error.response.data.message}`);
      } else {
        toast.error('Login failed. Please check your credentials');
      }
    }
    
  };

  const isTokenValid = () => {
    const expirationTime = localStorage.getItem('tokenExpiration');
    return expirationTime && new Date().getTime() < expirationTime;
  };

  return (
    <section className="register">
      <div className="container">
        <ToastContainer />
        <h2>Sign In</h2>
        <form className="form login__form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={userData.email}
            onChange={changeInputHandler}
            aria-label="Email"
            autoFocus
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={userData.password}
            onChange={changeInputHandler}
            aria-label="Password"
            required
          />
          <button type="submit" className="btn primary">
            Login
          </button>
        </form>
        <small>
          Don't have an account? <Link to="/register">Sign up</Link>
        </small>
      </div>
    </section>
  );
};

export default Login;
