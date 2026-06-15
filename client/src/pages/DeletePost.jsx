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
