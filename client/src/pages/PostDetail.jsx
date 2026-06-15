<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PostAuthor from '../components/PostAuthor';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const API = 'http://localhost:5000';
const CAT_COLORS = {Agriculture:'#15803d',Business:'#1d4ed8',Education:'#a16207',Entertainment:'#7e22ce',Art:'#be123c',Investment:'#0f766e',Weather:'#0369a1',Uncategorized:'#475569'};
export default function PostDetail() {
  const { id }    = useParams();
  const navigate  = useNavigate();
  const [post,    setPost]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');
  const [loggedIn,setLoggedIn]= useState(false);
  const [userId,  setUserId]  = useState('');
  const [deleting,setDeleting]= useState(false);
  const [confirm, setConfirm] = useState(false);
  useEffect(() => {
    const t = localStorage.getItem('token');
    const u = localStorage.getItem('userId');
    setLoggedIn(!!t); setUserId(u||'');
    axios.get(`${API}/api/posts/${id}`).then(r=>setPost(r.data)).catch(()=>setError('Failed to load post.')).finally(()=>setLoading(false));
  }, [id]);
  const handleDelete = async () => {
    setDeleting(true);
    try {
      await axios.delete(`${API}/api/posts/${id}`,{headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}});
      toast.success('Post deleted!');
      setTimeout(()=>navigate('/'),1100);
    } catch { toast.error('Failed to delete.'); setDeleting(false); }
  };
  const isOwner = loggedIn && post && String(post.creator)===String(userId);
  const catColor = post ? (CAT_COLORS[post.category]||'#6366f1') : '#6366f1';
  if (loading) return <div className="page-loading" style={{minHeight:'60vh',display:'flex',alignItems:'center',justifyContent:'center'}}><div className="spin"/><span>Loading post…</span></div>;
  if (error||!post) return <div className="container" style={{padding:'5rem 1.5rem',textAlign:'center',color:'#e11d48'}}>{error||'Post not found.'}</div>;
  return (
    <div className="pd-page">
      <ToastContainer position="top-right" autoClose={3000}/>
      <div className="pd-hero" style={{backgroundImage:`url(${API}/uploads/${post.thumbnail})`}}>
        <div className="pd-overlay"/>
        <div className="container pd-hero-content">
          <span className="pd-cat-pill" style={{background:catColor}}>{post.category}</span>
          <h1 className="pd-post-title">{post.title}</h1>
          <div className="pd-meta-row">
            <PostAuthor authorId={post.creator}/>
            <span className="pd-date">{new Date(post.createdAt).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})}</span>
          </div>
        </div>
      </div>
      <div className="container pd-body">
        <div className="pd-content-wrap">
          <div className="pd-toolbar">
            <div className="pd-toolbar-left">
              <span className="pd-breadcrumb"><Link to="/">Home</Link> → <Link to={`/posts/categories/${post.category}`}>{post.category}</Link></span>
            </div>
            {isOwner && (
              <div className="pd-toolbar-right">
                <Link to={`/posts/${post._id}/edit`} className="btn btn-ghost btn-sm">✏️ Edit</Link>
                <button onClick={()=>setConfirm(true)} className="btn btn-danger btn-sm">🗑 Delete</button>
              </div>
            )}
          </div>
          <div className="pd-content" dangerouslySetInnerHTML={{__html:post.description}}/>
          <div className="pd-footer">
            <span className="pd-tag" style={{background:catColor+'1a',color:catColor}}>#{post.category}</span>
            <Link to="/" className="btn btn-ghost btn-sm">← All Posts</Link>
          </div>
        </div>
      </div>
      {confirm && (
        <div className="modal-overlay" onClick={()=>setConfirm(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <h3>🗑 Delete this post?</h3>
            <p>This action is permanent and cannot be undone. The post will be removed immediately.</p>
            <div className="modal-actions">
              <button onClick={()=>setConfirm(false)} className="btn btn-ghost">Cancel</button>
              <button onClick={handleDelete} disabled={deleting} className="btn btn-danger">{deleting?'Deleting…':'Yes, Delete'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
=======
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
>>>>>>> d622943dd43b7c5375060cca52dbebba4f67b2e6
