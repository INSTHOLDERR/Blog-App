import React, {
  useState,
  useEffect,
} from 'react';
import "../csss/posrdetails.css"
import {
  useParams,
  Link,
  useNavigate,
} from 'react-router-dom';

import axios from 'axios';

import PostAuthor from '../components/PostAuthor';

import {
  ToastContainer,
  toast,
} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const PostDetail = () => {

  const { id } = useParams();

  const [post, setPost] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState('');

  const [isLoggedIn, setIsLoggedIn] =
    useState(false);

  const navigate = useNavigate();

  // FETCH POST
  useEffect(() => {

    const token =
      localStorage.getItem('token');

    setIsLoggedIn(!!token);

    const fetchPost = async () => {

      try {

        const { data } =
          await axios.get(
            `http://localhost:5000/api/posts/${id}`
          );

        setPost(data);

      } catch (err) {

        setError(
          'Failed to fetch post data.'
        );

      } finally {

        setLoading(false);

      }

    };

    fetchPost();

  }, [id]);

  // DELETE
  const handleDelete = async () => {

    try {

      await axios.delete(
        `http://localhost:5000/api/posts/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      toast.success(
        'Post deleted successfully!'
      );

      setTimeout(() => {

        navigate('/');

      }, 1000);

    } catch (err) {

      toast.error(
        'Failed to delete post.'
      );

    }

  };

  // LOADING
  if (loading) {

    return (
      <section className="post-detail-page">
        <h2 className="center">
          Loading...
        </h2>
      </section>
    );

  }

  // ERROR
  if (error) {

    return (
      <section className="post-detail-page">
        <p className="form__error-message">
          {error}
        </p>
      </section>
    );

  }

  return (

    <section className="post-detail-page">

      <ToastContainer />

      <div className="post-detail-container">

        {/* HEADER */}
        <div className="post-detail-header">

          <PostAuthor
            authorId={post.creator}
          />

          {isLoggedIn && (

            <div className="post-actions">

              <Link
                to={`/posts/${post._id}/edit`}
                className="edit-btn"
              >
                Edit
              </Link>

              <button
                onClick={handleDelete}
                className="delete-btn"
              >
                Delete
              </button>

            </div>

          )}

        </div>

        {/* TITLE */}
        <h1 className="post-title">
          {post.title}
        </h1>

        {/* IMAGE */}
        <div className="post-thumbnail">

          <img
            src={`http://localhost:5000/uploads/${post.thumbnail}`}
            alt={post.title}
          />

        </div>

        {/* CONTENT */}
        <div
          className="post-description"
          dangerouslySetInnerHTML={{
            __html: post.description,
          }}
        />

      </div>

    </section>

  );

};

export default PostDetail;