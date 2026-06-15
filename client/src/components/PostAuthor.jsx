<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const API = 'http://localhost:5000';
export default function PostAuthor({ authorId }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (!authorId) return;
    axios.get(`${API}/api/users/${authorId}`).then(r => setUser(r.data)).catch(() => {});
  }, [authorId]);
  if (!user) return <div className="pa-skeleton" />;
  const avatar  = user.avatar ? `${API}/uploads/${user.avatar}` : null;
  const initial = user.name?.[0]?.toUpperCase() || 'A';
  return (
    <Link to={`/posts/users/${authorId}`} className="pa-wrap">
      <div className="pa-avatar-ring">
        {avatar ? <img src={avatar} alt={user.name} onError={e=>e.target.style.display='none'}/> : <div className="pa-avatar-fallback">{initial}</div>}
      </div>
      <div className="pa-info">
        <span className="pa-name">{user.name}</span>
        <span className="pa-posts-count">{user.posts} posts</span>
      </div>
    </Link>
  );
}
=======
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const PostAuthor = ({ authorId }) => {
  console.log("jhbhdgc", authorId);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/${authorId}`
        );
        setUser(response.data);
        setLoading(false);
        console.log(response.data);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUser();
  }, [authorId]);

  if (loading) {
    return <h2>Loading user...</h2>;
  }

  if (error) {
    return <h2>Error: {error}</h2>;
  }

  return (
    <Link key={user._id} to={`/myposts/${authorId}`} className="author">
      <div className="author__avatar">
        <img
          src={`http://localhost:5000/uploads/${user.avatar}`}
          alt={`Image of ${user.name}`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "http://localhost:3000/img/sample.png"; 
          }}
        />
      </div>
      <div className="author__info">
        <h4>{user.name}</h4>
        <small>{user.posts} posts</small>
      </div>
    </Link>
  );
};

export default PostAuthor;
>>>>>>> d622943dd43b7c5375060cca52dbebba4f67b2e6
