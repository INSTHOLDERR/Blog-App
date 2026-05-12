import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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