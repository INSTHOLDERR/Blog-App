import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import Avatar from '../images/shyam-kathayat-FCMSCx_EKe4-unsplash.jpg';
import { FaEdit } from "react-icons/fa"; 
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserProfile = () => {
  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [userId, setUserId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    setUserId(storedUserId);
    fetchUser(storedUserId);
  }, []);

  const fetchUser = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
      const user = response.data;
      setName(user.name);
      setEmail(user.email);
      setAvatar(`http://localhost:5000/uploads/${user.avatar}`);
    } catch (error) {
      console.error('Error fetching user:', error.response.data);
    }
  };

  const handleAvatarChange = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('avatar', e.target.files[0]);

    try {
      const response = await axios.post('http://localhost:5000/api/users/change-avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });
      setAvatar(`http://localhost:5000/uploads/${response.data.avatar}`);
    } catch (error) {
      setErrorMessage(error.response.data.message);
      console.error('Error changing avatar:', error.response.data);
    }
  };

  const handleProfileEdit = async (e) => {
    e.preventDefault();
    const userData = { name, email, currentPassword, newPassword, confirmNewPassword };

    try {
      const response = await axios.patch('http://localhost:5000/api/users/edit-user', userData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });
      setName(response.data.name);
      setEmail(response.data.email);
      toast.success('Profile updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (error) {
      setErrorMessage(error.response.data.message);
      toast.error('Error updating profile.');
      console.error('Error editing user:', error.response.data);
    }
  };

  return (
    <>
      <ToastContainer />
      <section className="profile">
        <div className="container profile__container">
          <Link to={`/myposts/${userId}`} className='btn'>My posts</Link>

          <div className="profile__details">
            <div className="avatar__wrapper">
              <div className="profile__avatar">
                <img src={avatar} alt="Avatar" />
              </div>
              <form action="" className="avatar__form">
                <input 
                  type="file" 
                  name='avatar' 
                  id='avatar' 
                  onChange={handleAvatarChange} 
                  accept='image/png, image/jpg, image/jpeg' 
                />
                <label htmlFor="avatar"><FaEdit /></label>
              </form>
            </div>
            <h1>{name}</h1>

            <form className="form profile__form" onSubmit={handleProfileEdit}>
              {errorMessage && <p className='form__error-message'>{errorMessage}</p>}
              <input 
                type="text" 
                placeholder='Full Name' 
                value={name} 
                onChange={e => setName(e.target.value)} 
              />
              <input 
                type="email" 
                placeholder='Email' 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
              />
              <input 
                type="password" 
                placeholder='Current Password' 
                value={currentPassword} 
                onChange={e => setCurrentPassword(e.target.value)} 
              />
              <input 
                type="password" 
                placeholder='New Password' 
                value={newPassword} 
                onChange={e => setNewPassword(e.target.value)} 
              />
              <input 
                type="password" 
                placeholder='Confirm New Password' 
                value={confirmNewPassword} 
                onChange={e => setConfirmNewPassword(e.target.value)} 
              />
              <button type="submit" className='btn primary'>Update details</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserProfile;
