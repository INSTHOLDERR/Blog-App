import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PostAuthor from '../components/PostAuthor';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PostDetail = () => {
  const { id } = useParams(); 
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); 

    const fetchPost = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/posts/${id}`);
        setPost(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch post data.');
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      toast.success('Post deleted successfully!');
      setTimeout(() => {
        navigate('/'); 
      }, 1000); 
    } catch (err) {
      toast.error('Failed to delete post.');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="form__error-message">{error}</p>;
  }

  return (
    <section className="post-detail">
      <div className="container post-detail__container">
        <ToastContainer />
        <div className="post-detail__header">
          <PostAuthor authorId={post.creator} />
          {isLoggedIn && (
            <div className="post-detail__buttons">
              <Link to={`/posts/${post._id}/edit`} className="btn sm primary">Edit</Link>
              <button onClick={handleDelete} className="btn sm danger">Delete</button>
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        <div className="post-detail__thumbnail">
          <img src={`http://localhost:5000/uploads/${post.thumbnail}`} alt="Post Thumbnail" />
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.description }} />
      </div>
    </section>
  );
};

export default PostDetail;
