import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
<<<<<<< HEAD
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Login() {
  const navigate = useNavigate();
  const [form, setForm]     = useState({ email:'', password:'' });
  const [loading, setLoading] = useState(false);
  const handleChange = e => setForm(p=>({...p,[e.target.name]:e.target.value}));
  const handleSubmit = async e => {
    e.preventDefault(); setLoading(true);
    try {
      const { data } = await axios.post('http://localhost:5000/api/users/login', form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.id);
      localStorage.setItem('tokenExpiration', new Date().getTime()+24*3600*1000);
      window.dispatchEvent(new Event('storage'));
      toast.success('Welcome back!');
      setTimeout(()=>navigate('/'),900);
    } catch(err) { toast.error(err.response?.data?.message||'Invalid credentials.'); }
    finally { setLoading(false); }
  };
  return (
    <div className="auth-page">
      <ToastContainer position="top-right" autoClose={3000}/>
      <div className="auth-panel-left" style={{background:'linear-gradient(145deg,#1e1b4b,#312e81,#4c1d95)'}}>
        <div className="auth-panel-left-inner">
          <Link to="/" className="auth-logo-link">✍️ BlogSpace</Link>
          <h2 className="auth-panel-title">Welcome back to the community</h2>
          <p className="auth-panel-sub">Sign in to continue sharing ideas, connecting with authors, and exploring amazing stories.</p>
          <div className="auth-features">
            {['📝 Write and publish posts','🌍 Reach readers worldwide','💬 Connect with authors','📊 Track your content'].map(f=><div key={f} className="auth-feature">{f}</div>)}
          </div>
        </div>
        <div className="auth-blob"/>
      </div>
      <div className="auth-panel-right">
        <div className="auth-card">
          <div className="auth-card-header"><h1>Sign In</h1><p>Enter your details to continue</p></div>
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-group">
              <label>Email Address</label>
              <input type="email" name="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required autoFocus/>
            </div>
            <div className="input-group">
              <label>Password</label>
              <input type="password" name="password" placeholder="Your password" value={form.password} onChange={handleChange} required/>
            </div>
            <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
              {loading?<><span className="btn-spinner"/>Signing in…</>:'Sign In →'}
            </button>
          </form>
          <p className="auth-switch">Don't have an account? <Link to="/register">Create one →</Link></p>
        </div>
      </div>
    </div>
  );
}
=======
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
>>>>>>> d622943dd43b7c5375060cca52dbebba4f67b2e6
