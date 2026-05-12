import React from 'react';
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