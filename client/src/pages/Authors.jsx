import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
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
=======
import "../csss/authors.css"
import axios from 'axios';

const Authors = () => {

  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // FETCH AUTHORS
  useEffect(() => {

    const fetchAuthors = async () => {

      try {

        const response = await axios.get(
          'http://localhost:5000/api/users/'
        );

        setAuthors(response.data);

      } catch (err) {

        setError(err.message);

      } finally {

        setLoading(false);

      }

    };

    fetchAuthors();

  }, []);

  // LOADING
  if (loading) {

    return (
      <section className="authors-page">
        <h2 className="center">Loading Authors...</h2>
      </section>
    );

  }

  // ERROR
  if (error) {

    return (
      <section className="authors-page">
        <h2 className="center">
          Error: {error}
        </h2>
      </section>
    );

  }

  return (

    <section className="authors-page">

      {/* HEADER */}
      <div className="authors-header">

        <h1>Our Authors ✍️</h1>

        <p>
          Explore all creators and their amazing posts.
        </p>

      </div>

      {/* AUTHORS */}
      {authors.length > 0 ? (

        <div className="container authors__container">

          {authors.map(
            ({ _id, avatar, name, posts }) => {

              const fullAvatarURL = avatar
                ? `http://localhost:5000/uploads/${avatar}`
                : '/img/sample.png';

              return (

                <Link
                  key={_id}
                  to={`/posts/users/${_id}`}
                  className="author-card"
                >

                  {/* AVATAR */}
                  <div className="author__avatar">

                    <img
                      src={fullAvatarURL}
                      alt={name}
                    />

                  </div>

                  {/* INFO */}
                  <div className="author__info">

                    <h3>{name}</h3>

                    <small>
                      {posts} Posts
                    </small>

                  </div>

                </Link>

              );

            }
          )}

        </div>

      ) : (

        <div className="empty-authors">

          <h2>No Authors Found 😔</h2>

        </div>

      )}

    </section>

  );

};

export default Authors;
>>>>>>> d622943dd43b7c5375060cca52dbebba4f67b2e6
