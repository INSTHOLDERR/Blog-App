import React, { useState, useEffect } from 'react';
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