import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    setUserId(storedUserId);
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchUserPosts = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/posts/users/${userId}`);
          const data = await response.json();
          setPosts(data);
          console.log(data);
        } catch (error) {
          console.error('Error fetching user posts:', error);
        }
      };

      fetchUserPosts();
    }
  }, [userId]);

  return (
    <section className="dashboard">
      {posts.length ? (
        <div className="container dashboard__container">
          {posts.map(post => (
            <article key={post._id} className="dashboard__post">
              <div className="dashboard__post-info">
                <div className="dashboard__post-thumbnail">
                  <img src={`http://localhost:5000/uploads/${post.thumbnail}`} alt={post.title} />
                </div>
                <h5>{post.title}</h5>
              </div>
              <div className="dashboard__post-actions">
                <Link to={`/posts/${post._id}`} className="btn sm">View</Link>
                <Link to={`/posts/${post._id}/edit`} className="btn sm primary">Edit</Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <h2 className="center">You have no posts</h2>
      )}
    </section>
  );
};

export default Dashboard;
