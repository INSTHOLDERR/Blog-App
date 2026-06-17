import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../context/AuthContext.jsx';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [form, setForm]     = useState({ email:'', password:'' });
  const [loading, setLoading] = useState(false);
  const handleChange = e => setForm(p=>({...p,[e.target.name]:e.target.value}));
  const handleSubmit = async e => {
    e.preventDefault(); setLoading(true);
    try {
      const { data } = await axios.post('http://localhost:5000/api/users/login', form);
      login(data);
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
