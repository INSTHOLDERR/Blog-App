import React from 'react';
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
