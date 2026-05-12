import React, { useState } from 'react';

import axios from 'axios';
import "../csss/register.css"
import { Link } from "react-router-dom";

import {
  ToastContainer,
  toast,
} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const Register = () => {

  const [userData, setUserData] =
    useState({
      name: '',
      email: '',
      password: '',
      password2: '',
    });

  const [error, setError] =
    useState('');

  // INPUT CHANGE
  const changeInputHandler = (e) => {

    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  };

  // SUBMIT
  const submitHandler = async (e) => {

    e.preventDefault();

    try {

      const response =
        await axios.post(
          'http://localhost:5000/api/users/register',
          userData
        );

      console.log(response.data);

      // RESET
      setUserData({
        name: '',
        email: '',
        password: '',
        password2: '',
      });

      setError('');

      // SUCCESS
      toast.success(
        'Registration successful!'
      );

    } catch (err) {

      setError(
        err.response?.data?.message ||
        'Registration failed.'
      );

    }

  };

  return (

    <section className="register-page">

      <ToastContainer />

      <div className="register-container">

        {/* LEFT */}
        <div className="register-left">

          <h1>Join Our Blog 🚀</h1>

          <p>
            Create an account and start
            sharing your thoughts,
            stories, and ideas with the
            world.
          </p>

        </div>

        {/* RIGHT */}
        <div className="register-right">

          <div className="register-card">

            <h2>Create Account</h2>

            {/* ERROR */}
            {error && (

              <p className="form__error-message">
                {error}
              </p>

            )}

            {/* FORM */}
            <form
              className="register-form"
              onSubmit={submitHandler}
            >

              {/* NAME */}
              <input
                type="text"
                placeholder="Full Name"
                name="name"
                value={userData.name}
                onChange={changeInputHandler}
              />

              {/* EMAIL */}
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={userData.email}
                onChange={changeInputHandler}
              />

              {/* PASSWORD */}
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={userData.password}
                onChange={changeInputHandler}
              />

              {/* CONFIRM PASSWORD */}
              <input
                type="password"
                placeholder="Confirm Password"
                name="password2"
                value={userData.password2}
                onChange={changeInputHandler}
              />

              {/* BUTTON */}
              <button
                type="submit"
                className="register-btn"
              >
                Register
              </button>

            </form>

            {/* LOGIN */}
            <small>
              Already have an account?{' '}

              <Link to="/login">
                Sign In
              </Link>

            </small>

          </div>

        </div>

      </div>

    </section>

  );

};

export default Register;