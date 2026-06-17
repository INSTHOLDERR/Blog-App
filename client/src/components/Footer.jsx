import React from 'react';
import { Link } from 'react-router-dom';
const CATS = ['Agriculture','Business','Education','Entertainment','Art','Investment','Weather','Uncategorized'];
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-logo-wrap">
              <div className="footer-logo-icon">✍️</div>
              <span className="footer-logo-text">BlogSpace</span>
            </div>
            <p className="footer-tagline">A space for curious minds to share ideas, stories, and knowledge with the world.</p>
          </div>
          <div>
            <p className="footer-col-title">Categories</p>
            <div className="footer-links">{CATS.slice(0,4).map(c=><Link key={c} to={`/posts/categories/${c}`} className="footer-link">{c}</Link>)}</div>
          </div>
          <div>
            <p className="footer-col-title">&nbsp;</p>
            <div className="footer-links">{CATS.slice(4).map(c=><Link key={c} to={`/posts/categories/${c}`} className="footer-link">{c}</Link>)}</div>
          </div>
          <div>
            <p className="footer-col-title">Quick Links</p>
            <div className="footer-links">
              <Link to="/"         className="footer-link">Home</Link>
              <Link to="/authors"  className="footer-link">Authors</Link>
              <Link to="/create"   className="footer-link">Write a Post</Link>
              <Link to="/register" className="footer-link">Get Started</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">© {new Date().getFullYear()} BlogSpace. All rights reserved. Built by Nikhil.</p>
          <div className="footer-bottom-links">
            <Link to="/authors" className="footer-link" style={{fontSize:'.8rem'}}>Authors</Link>
            <Link to="/create"  className="footer-link" style={{fontSize:'.8rem'}}>Write</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
