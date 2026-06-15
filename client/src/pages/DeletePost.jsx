<<<<<<< HEAD
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DeletePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios.delete(`http://localhost:5000/api/posts/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).finally(() => navigate('/'));
  }, [id, navigate]);
  return null;
};
export default DeletePost;
=======
import React from 'react'

const DeletePost = () => {
  return (
    <div>
      DeletePost
    </div>
  )
}

export default DeletePost
>>>>>>> d622943dd43b7c5375060cca52dbebba4f67b2e6
