import React from 'react';
<<<<<<< HEAD
import { Link, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#f8fafc', padding:'2rem', textAlign:'center' }}>
      <div>
        <div style={{ fontSize:'6rem', marginBottom:'1rem' }}>🚫</div>
        <h1 style={{ fontSize:'2.5rem', fontWeight:900, color:'#0f172a', marginBottom:'.5rem' }}>
          {error?.status === 404 ? 'Page Not Found' : 'Oops!'}
        </h1>
        <p style={{ color:'#64748b', marginBottom:'2rem', fontSize:'1.0625rem' }}>
          {error?.statusText || error?.message || "This page doesn't exist."}
        </p>
        <Link to="/" style={{ padding:'.875rem 2rem', background:'#6366f1', color:'#fff', borderRadius:'999px', fontWeight:600, fontSize:'1rem', textDecoration:'none', display:'inline-block' }}>← Back to Home</Link>
      </div>
    </div>
  );
};
export default ErrorPage;
=======
import "../csss/error.css"
import { Link } from 'react-router-dom';

const ErrorPage = () => {

  return (

    <section className="error-page">

      <div className="error-container">

        {/* ERROR CODE */}
        <h1>404</h1>

        {/* TITLE */}
        <h2>Page Not Found</h2>

        {/* DESCRIPTION */}
        <p>
          Sorry, the page you are looking for
          does not exist or has been moved.
        </p>

        {/* BUTTON */}
        <Link
          to="/"
          className="error-btn"
        >
          Go Back Home
        </Link>

      </div>

    </section>

  );

};

export default ErrorPage;
>>>>>>> d622943dd43b7c5375060cca52dbebba4f67b2e6
