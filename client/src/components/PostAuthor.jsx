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
