import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../csss/login.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  // INPUT CHANGE
  const changeInputHandler = (e) => {

    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  };

  // LOGIN
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        'http://localhost:5000/api/users/login',
        userData
      );

      const { token, id } = response.data;

      // TOKEN EXPIRATION
      const expirationTime =
        new Date().getTime() + 24 * 60 * 60 * 1000;

      // SAVE DATA
      localStorage.setItem('token', token);
      localStorage.setItem('userId', id);
      localStorage.setItem(
        'tokenExpiration',
        expirationTime
      );

      // UPDATE NAVBAR
      window.dispatchEvent(new Event("storage"));

      toast.success('Login successful! Redirecting...');

      setTimeout(() => {
        navigate('/');
      }, 1000);

    } catch (error) {

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {

        toast.error(
          `Login failed: ${error.response.data.message}`
        );

      } else {

        toast.error(
          'Login failed. Please check your credentials'
        );

      }

    }

  };

  return (

    <section className="login-page">

      <ToastContainer />

      <div className="login-container">

        {/* LEFT SIDE */}
        <div className="login-left">

          <div className="login-content">

            <h1>Welcome Back 👋</h1>

            <p>
              Login to continue exploring amazing posts,
              connect with authors, and share your ideas.
            </p>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="login-right">

          <div className="login-card">

            <h2>Sign In</h2>

            <form
              className="login-form"
              onSubmit={handleSubmit}
            >

              {/* EMAIL */}
              <div className="input-group">

                <label>Email</label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={userData.email}
                  onChange={changeInputHandler}
                  autoFocus
                  required
                />

              </div>

              {/* PASSWORD */}
              <div className="input-group">

                <label>Password</label>

                <input
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={userData.password}
                  onChange={changeInputHandler}
                  required
                />

              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="login-btn"
              >
                Login
              </button>

            </form>

            <small>
              Don't have an account?{' '}
              <Link to="/register">
                Sign Up
              </Link>
            </small>

          </div>

        </div>

      </div>

    </section>

  );

};

export default Login;