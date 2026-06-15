import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { Link } from 'react-router-dom';

const API = 'http://localhost:5000';

const Dashboard = () => {
  // eslint-disable-next-line
const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const uid = localStorage.getItem('userId');
    if (!uid) { setLoading(false); return; }
    fetch(`${API}/api/posts/users/${uid}`)
      .then(r => r.json())
      .then(setPosts)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const strip = h => h.replace(/<[^>]*>?/gm, '');

  return (
    <div className="dash-page">
      <div className="dash-hero">
        <div className="container">
          <span className="dash-badge">My Dashboard</span>
          <h1 className="dash-title">My Posts</h1>
          <p className="dash-sub">Manage, edit, and track all your published articles.</p>
          <Link to="/create" className="btn btn-white-outline">+ Write New Post</Link>
        </div>
      </div>

      <div className="container dash-body">
        {loading ? (
          <div className="page-loading"><div className="spin" /><span>Loading posts…</span></div>
        ) : posts.length === 0 ? (
          <div className="empty-box">
            <div className="empty-icon">📝</div>
            <h2>No Posts Yet</h2>
            <p>Start writing your first post and share it with the world!</p>
            <Link to="/create" className="btn btn-primary btn-lg">Create First Post</Link>
          </div>
        ) : (
          <>
            <div className="dash-stats">
              <div className="dash-stat-card">
                <span className="stat-num">{posts.length}</span>
                <span className="stat-label">Total Posts</span>
              </div>
              <div className="dash-stat-card">
                <span className="stat-num">{new Set(posts.map(p=>p.category)).size}</span>
                <span className="stat-label">Categories</span>
              </div>
              <div className="dash-stat-card">
                <span className="stat-num">{posts.filter(p=>new Date(p.createdAt) > new Date(Date.now()-30*864e5)).length}</span>
                <span className="stat-label">This Month</span>
              </div>
            </div>
            <p className="results-label">{posts.length} article{posts.length!==1?'s':''} published</p>
            <div className="dash-grid">
              {posts.map(post => (
                <article key={post._id} className="dash-card">
                  <div className="dash-card-img-wrap">
                    <img src={`${API}/uploads/${post.thumbnail}`} alt={post.title} className="dash-card-img"
                      onError={e => e.target.src='/img/sample.png'} />
                    <span className="dash-card-cat">{post.category}</span>
                  </div>
                  <div className="dash-card-body">
                    <h3 className="dash-card-title">{post.title.length>62?post.title.slice(0,62)+'…':post.title}</h3>
                    <p className="dash-card-desc">{strip(post.description).slice(0,90)}…</p>
                    <p className="dash-card-date">{new Date(post.createdAt).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}</p>
                    <div className="dash-card-actions">
                      <Link to={`/posts/${post._id}`}      className="dash-btn dash-btn-view">👁 View</Link>
                      <Link to={`/posts/${post._id}/edit`} className="dash-btn dash-btn-edit">✏️ Edit</Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
=======
import "../csss/dashboard.css"
import { Link } from 'react-router-dom';

const Dashboard = () => {

  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState(null);

  // GET USER ID
  useEffect(() => {

    const storedUserId =
      localStorage.getItem('userId');

    setUserId(storedUserId);

  }, []);

  // FETCH POSTS
  useEffect(() => {

    if (userId) {

      const fetchUserPosts = async () => {

        try {

          const response = await fetch(
            `http://localhost:5000/api/posts/users/${userId}`
          );

          const data = await response.json();

          setPosts(data);

        } catch (error) {

          console.error(
            'Error fetching user posts:',
            error
          );

        }

      };

      fetchUserPosts();

    }

  }, [userId]);

  return (

    <section className="dashboard-page">

      {/* HEADER */}
      <div className="dashboard-header">

        <h1>My Posts 📚</h1>

        <p>
          Manage and edit all your posts here.
        </p>

      </div>

      {/* POSTS */}
      {posts.length > 0 ? (

        <div className="container dashboard__container">

          {posts.map((post) => (

            <article
              key={post._id}
              className="dashboard__post"
            >

              {/* IMAGE */}
              <div className="dashboard__post-thumbnail">

                <img
                  src={`http://localhost:5000/uploads/${post.thumbnail}`}
                  alt={post.title}
                />

              </div>

              {/* CONTENT */}
              <div className="dashboard__post-content">

                <h3>{post.title}</h3>

                <div className="dashboard__post-actions">

                  <Link
                    to={`/posts/${post._id}`}
                    className="dashboard-btn view-btn"
                  >
                    View
                  </Link>

                  <Link
                    to={`/posts/${post._id}/edit`}
                    className="dashboard-btn edit-btn"
                  >
                    Edit
                  </Link>

                </div>

              </div>

            </article>

          ))}

        </div>

      ) : (

        <div className="empty-dashboard">

          <h2>No Posts Yet 😔</h2>

          <p>
            Start creating your first post.
          </p>

          <Link
            to="/create"
            className="create-post-btn"
          >
            Create Post
          </Link>

        </div>

      )}

    </section>

  );

};

export default Dashboard;
>>>>>>> d622943dd43b7c5375060cca52dbebba4f67b2e6
