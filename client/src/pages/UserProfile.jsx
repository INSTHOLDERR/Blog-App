<<<<<<< HEAD
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API = 'http://localhost:5000';

// Eye icon SVGs
const EyeOn  = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
const EyeOff = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>;

function PwdInput({ label, value, onChange, placeholder, autoComplete }) {
  const [show, setShow] = useState(false);
  return (
    <div className="input-group">
      <label>{label}</label>
      <div style={{ position: 'relative' }}>
        <input
          type={show ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete || 'new-password'}
          style={{ paddingRight: '2.75rem' }}
        />
        <button
          type="button"
          onClick={() => setShow(v => !v)}
          style={{
            position: 'absolute', right: '.875rem', top: '50%',
            transform: 'translateY(-50%)', background: 'none',
            border: 'none', cursor: 'pointer', color: 'var(--ink-4)',
            display: 'flex', alignItems: 'center', padding: 0,
          }}
        >
          {show ? <EyeOn /> : <EyeOff />}
        </button>
      </div>
    </div>
  );
}

export default function UserProfile() {
  const [name,    setName]    = useState('');
  const [email,   setEmail]   = useState('');
  const [avatar,  setAvatar]  = useState('');
  const [curPwd,  setCurPwd]  = useState('');
  const [newPwd,  setNewPwd]  = useState('');
  const [conPwd,  setConPwd]  = useState('');
  const [userId,  setUserId]  = useState('');
  const [error,   setError]   = useState('');
  const [success, setSuccess] = useState('');
  const [saving,  setSaving]  = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);

  useEffect(() => {
    const uid = localStorage.getItem('userId');
    setUserId(uid || '');
    if (uid) {
      axios.get(`${API}/api/users/${uid}`)
        .then(r => {
          setName(r.data.name || '');
          setEmail(r.data.email || '');
          setAvatar(r.data.avatar ? `${API}/uploads/${r.data.avatar}` : '');
        })
        .catch(() => {});
    }
  }, []);

  const handleAvatar = async e => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append('avatar', file);
    try {
      const { data } = await axios.post(`${API}/api/users/change-avatar`, fd, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const newAv = data.user?.avatar || data.avatar;
      setAvatar(`${API}/uploads/${newAv}?t=${Date.now()}`);
      toast.success('Profile picture updated!');
    } catch (e) {
      toast.error(e.response?.data?.message || 'Upload failed.');
    } finally { setUploading(false); }
  };

  const handleSave = async e => {
    e.preventDefault();
    setError(''); setSuccess('');

    // Build only the fields the user actually filled
    const payload = {};

    if (name.trim())  payload.name  = name.trim();
    if (email.trim()) payload.email = email.trim();

    // Password change — only if current password is provided
    if (curPwd) {
      if (!newPwd) { setError('Please enter a new password.'); return; }
      if (newPwd !== conPwd) { setError('New passwords do not match.'); return; }
      if (newPwd.length < 6) { setError('New password must be at least 6 characters.'); return; }
      payload.currentPassword    = curPwd;
      payload.newPassword        = newPwd;
      payload.confirmNewPassword = conPwd;
    } else {
      // Backend requires these fields — send current values as placeholders
      // to avoid the "fill all fields" error when only updating name/email
      payload.currentPassword    = '__skip__';
      payload.newPassword        = '__skip__';
      payload.confirmNewPassword = '__skip__';
    }

    if (!payload.name && !payload.email && !curPwd) {
      setError('Please change at least one field before saving.');
      return;
    }

    setSaving(true);
    try {
      const { data } = await axios.patch(`${API}/api/users/edit-user`, payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setName(data.name || name);
      setEmail(data.email || email);
      setCurPwd(''); setNewPwd(''); setConPwd('');
      setSuccess('Profile updated successfully!');
      toast.success('Profile updated!');
    } catch (e) {
      setError(e.response?.data?.message || 'Update failed. Please check your current password.');
    } finally { setSaving(false); }
  };

  const initial = name?.[0]?.toUpperCase() || 'U';

  return (
    <div className="profile-page">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="container profile-body">

        {/* Sidebar */}
        <aside className="profile-sidebar">
          <div className="profile-sidebar-top">
            <div className="profile-avatar-ring">
              {avatar
                ? <img src={avatar} alt="Avatar" onError={e => { e.target.src = '/img/sample.png'; }} />
                : <div className="profile-avatar-placeholder">{initial}</div>
              }
              <button
                className="avatar-upload-trigger"
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                title="Change profile photo"
              >
                {uploading ? '⏳' : '📷'}
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/png,image/jpg,image/jpeg"
                onChange={handleAvatar}
                style={{ display: 'none' }}
              />
            </div>
            <p className="profile-sidebar-name">{name || 'Your Name'}</p>
            <p className="profile-sidebar-email">{email}</p>
          </div>
          <div className="profile-sidebar-nav">
            <Link to={`/myposts/${userId}`} className="profile-nav-link"><span className="nav-icon">📚</span> My Posts</Link>
            <Link to="/"                    className="profile-nav-link"><span className="nav-icon">🏠</span> Home</Link>
            <Link to="/create"              className="profile-nav-link"><span className="nav-icon">✍️</span> Write Post</Link>
          </div>
        </aside>

        {/* Main */}
        <main className="profile-main">
          <div className="profile-card">
            <h2 className="profile-card-title">✏️ Edit Profile</h2>
            <p style={{ fontSize: '.875rem', color: 'var(--ink-4)', marginBottom: '1.5rem', marginTop: '-.75rem' }}>
              Only fill in the fields you want to update. Leave password fields empty to keep your current password.
            </p>

            {error   && <p className="form__error-message"  style={{ marginBottom: '1.25rem' }}>{error}</p>}
            {success && (
              <div style={{ padding: '.75rem 1rem', background: 'var(--green-pale, #f0fdf4)', border: '1.5px solid #bbf7d0', borderRadius: 'var(--r-md)', color: '#15803d', fontWeight: 500, fontSize: '.875rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                ✅ {success}
              </div>
            )}

            <form onSubmit={handleSave} className="profile-form" autoComplete="off">
              {/* Hidden fields to prevent browser autofill */}
              <input type="text"     style={{ display: 'none' }} autoComplete="username" readOnly />
              <input type="password" style={{ display: 'none' }} autoComplete="current-password" readOnly />

              <div className="section-divider"><span>Account Info</span></div>
              <div className="profile-form-row">
                <div className="input-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Your full name"
                    autoComplete="off"
                  />
                </div>
                <div className="input-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="section-divider" style={{ marginTop: '.5rem' }}><span>Change Password (optional)</span></div>
              <p style={{ fontSize: '.8125rem', color: 'var(--ink-4)', marginTop: '-.5rem' }}>
                Leave these empty if you don't want to change your password.
              </p>

              <div className="profile-form-row">
                <PwdInput
                  label="Current Password"
                  value={curPwd}
                  onChange={e => setCurPwd(e.target.value)}
                  placeholder="Enter current password"
                  autoComplete="current-password"
                />
                <PwdInput
                  label="New Password"
                  value={newPwd}
                  onChange={e => setNewPwd(e.target.value)}
                  placeholder="Min. 6 characters"
                  autoComplete="new-password"
                />
              </div>
              <div style={{ maxWidth: '340px' }}>
                <PwdInput
                  label="Confirm New Password"
                  value={conPwd}
                  onChange={e => setConPwd(e.target.value)}
                  placeholder="Repeat new password"
                  autoComplete="new-password"
                />
              </div>

              <div className="profile-form-footer">
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? 'Saving…' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
=======
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import Avatar from '../images/shyam-kathayat-FCMSCx_EKe4-unsplash.jpg';
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../csss/profile.css"

const UserProfile = () => {
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);
    fetchUser(storedUserId);
  }, []);

  const fetchUser = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/users/${userId}`
      );
      const user = response.data;
      setName(user.name);
      setEmail(user.email);
      setAvatar(`http://localhost:5000/uploads/${user.avatar}`);
    } catch (error) {
      console.error("Error fetching user:", error.response.data);
    }
  };

  const handleAvatarChange = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar", e.target.files[0]);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/change-avatar",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setAvatar(`http://localhost:5000/uploads/${response.data.avatar}`);
    } catch (error) {
      setErrorMessage(error.response.data.message);
      console.error("Error changing avatar:", error.response.data);
    }
  };

  const handleProfileEdit = async (e) => {
    e.preventDefault();
    const userData = {
      name,
      email,
      currentPassword,
      newPassword,
      confirmNewPassword,
    };

    try {
      const response = await axios.patch(
        "http://localhost:5000/api/users/edit-user",
        userData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setName(response.data.name);
      setEmail(response.data.email);
      toast.success("Profile updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error) {
      setErrorMessage(error.response.data.message);
      toast.error("Error updating profile.");
      console.error("Error editing user:", error.response.data);
    }
  };

  return (
    <>
      <ToastContainer />
      <section className="profile">
        <div className="container profile__container">
         <div className="profile__top">
  <Link to={`/myposts/${userId}`} className="btn">
    My Posts
  </Link>
</div>

          <div className="profile__details">
            <div className="avatar__wrapper">
              <div className="profile__avatar">
                <img
                  src={avatar}
                  alt="Avatar"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "http://localhost:3000/img/sample.png"; // fallback image
                  }}
                />
              </div>

              <form action="" className="avatar__form">
                <input
                  type="file"
                  name="avatar"
                  id="avatar"
                  onChange={handleAvatarChange}
                  accept="image/png, image/jpg, image/jpeg"
                />
                <label htmlFor="avatar">
                  <FaEdit />
                </label>
              </form>
            </div>
            <h1>{name}</h1>

            <form className="form profile__form" onSubmit={handleProfileEdit}>
              {errorMessage && (
                <p className="form__error-message">{errorMessage}</p>
              )}
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
              <button type="submit" className="btn primary">
                Update details
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserProfile;
>>>>>>> d622943dd43b7c5375060cca52dbebba4f67b2e6
