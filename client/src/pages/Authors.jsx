import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const API = 'http://localhost:5000';
export default function Authors() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  useEffect(() => {
    axios.get(`${API}/api/users/`).then(r=>setAuthors(r.data)).catch(e=>setError(e.message)).finally(()=>setLoading(false));
  }, []);
  return (
    <div className="authors-page">
      <div className="authors-hero">
        <div className="container">
          <div className="page-hero-badge">✍️ Community</div>
          <h1 className="page-hero-title">Meet Our Authors</h1>
          <p className="page-hero-sub">Discover talented writers sharing knowledge, stories, and insights from around the world.</p>
        </div>
      </div>
      <div className="container authors-body">
        {loading ? <div className="page-loading"><div className="spin"/><span>Loading authors…</span></div>
        : error ? <div className="empty-box"><div className="empty-icon">⚠️</div><h2>Couldn't load authors</h2><p>{error}</p></div>
        : authors.length===0 ? <div className="empty-box"><div className="empty-icon">👥</div><h2>No authors yet</h2><p>Be the first to register and write!</p><Link to="/register" className="btn btn-primary btn-lg">Get Started</Link></div>
        : (
          <>
            <p className="results-label">{authors.length} author{authors.length!==1?'s':''} in the community</p>
            <div className="authors-grid">
              {authors.map(({_id,avatar,name,posts})=>{
                const av = avatar?`${API}/uploads/${avatar}`:null;
                const ini = name?.[0]?.toUpperCase()||'A';
                return (
                  <Link key={_id} to={`/posts/users/${_id}`} className="author-card">
                    <div className="author-card-avatar-wrap">
                      {av?<img src={av} alt={name} className="author-card-avatar" onError={e=>e.target.src='/img/sample.png'}/>:<div className="author-card-avatar-placeholder">{ini}</div>}
                    </div>
                    <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'.25rem'}}>
                      <p className="author-card-name">{name}</p>
                      <p className="author-card-posts">{posts} {posts===1?'post':'posts'}</p>
                    </div>
                    <span className="author-card-cta">View Posts →</span>
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
