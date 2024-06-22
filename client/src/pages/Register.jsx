



import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });
  const [error, setError] = useState('');

  const changeInputHandler = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', userData);
      console.log(response.data); 

      // Clear the form
      setUserData({
        name: '',
        email: '',
        password: '',
        password2: ''
      });

      // Show success toast
      toast.success("Registration successful!");

    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <section className="register">
      <div className="container">
        <ToastContainer />
        <h2>Sign Up</h2>
        <form className="form register__form" onSubmit={submitHandler}>
          {error && <p className="form__error-message">{error}</p>}
          <input type="text" placeholder="Full Name" name="name" value={userData.name} onChange={changeInputHandler} />
          <input type="text" placeholder="Email" name="email" value={userData.email} onChange={changeInputHandler} />
          <input type="password" placeholder="Password" name="password" value={userData.password} onChange={changeInputHandler} />
          <input type="password" placeholder="Confirm password" name="password2" value={userData.password2} onChange={changeInputHandler} />
          <button type="submit" className='btn primary'>Register</button>
        </form>
        <small>Already have an account? <Link to="/login">Sign in</Link></small>
      </div>
    </section>
  );
};

export default Register;
