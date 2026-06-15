import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Register() {
  const navigate = useNavigate();
  const [form, setForm]     = useState({ name:'', email:'', password:'', password2:'' });
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);
  const handleChange = e => setForm(p=>({...p,[e.target.name]:e.target.value}));
  const handleSubmit = async e => {
    e.preventDefault(); setError(''); setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/users/register', form);
      toast.success('Account created! Redirecting to login…');
      setForm({name:'',email:'',password:'',password2:''});
      setTimeout(()=>navigate('/login'),1400);
    } catch(err) { setError(err.response?.data?.message||'Registration failed.'); }
    finally { setLoading(false); }
  };
  return (
    <div className="auth-page">
      <ToastContainer position="top-right" autoClose={3000}/>
      <div className="auth-panel-left" style={{background:'linear-gradient(145deg,#1e1b4b,#312e81,#4c1d95)'}}>
        <div className="auth-panel-left-inner">
          <Link to="/" className="auth-logo-link">✍️ BlogSpace</Link>
          <h2 className="auth-panel-title">Join thousands of writers today</h2>
          <p className="auth-panel-sub">Create your account and start sharing your voice with the world. Always free.</p>
          <div className="auth-features">
            {['🆓 Free to join, always','✍️ Write unlimited posts','🎨 Beautiful post editor','🤝 Grow your audience'].map(f=><div key={f} className="auth-feature">{f}</div>)}
          </div>
        </div>
        <div className="auth-blob"/>
      </div>
      <div className="auth-panel-right">
        <div className="auth-card">
          <div className="auth-card-header"><h1>Create Account</h1><p>Join BlogSpace and start writing</p></div>
          {error && <p className="form__error-message" style={{marginBottom:'1rem'}}>{error}</p>}
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-group"><label>Full Name</label><input type="text" name="name" placeholder="Your full name" value={form.name} onChange={handleChange} required/></div>
            <div className="input-group"><label>Email</label><input type="email" name="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required/></div>
            <div className="input-group"><label>Password</label><input type="password" name="password" placeholder="Min. 6 characters" value={form.password} onChange={handleChange} required/></div>
            <div className="input-group"><label>Confirm Password</label><input type="password" name="password2" placeholder="Repeat password" value={form.password2} onChange={handleChange} required/></div>
            <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
              {loading?<><span className="btn-spinner"/>Creating account…</>:'Create Account →'}
            </button>
          </form>
          <p className="auth-switch">Already have an account? <Link to="/login">Sign in →</Link></p>
        </div>
      </div>
    </div>
  );
}
