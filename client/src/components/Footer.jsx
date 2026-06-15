<<<<<<< HEAD
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
=======
import React from 'react'
import { Link } from 'react-router-dom'
import "../csss/footer.css"
const Footer = () => {
    return (
        <footer>
            <ul className="footer__categories">
                <li><Link to="/posts/categories/Agriculture">Agriculture</Link></li> I <li><Link to="/posts/categories/Business">Business</Link></li>

                <li><Link to="/posts/categories/Education">Education</Link></li>

                <li><Link to="/posts/categories/Entertainment">Entertainment</Link></li>

                <li><Link to="/posts/categories/Art">Art</Link></li>

                <li><Link to="/posts/categories/Investment">Investment</Link></li>

                <li><Link to="/posts/categories/Uncategorized">Uncategorized</Link></li>

                <li><Link to="/posts/categories/Weather">Weather</Link></li>

            </ul>

            <div className="footer__copyright">
                <small>All Rights Reserved &copy; Copyright,Nikhil</small>
            </div>
        </footer>
    )
}

export default Footer
>>>>>>> d622943dd43b7c5375060cca52dbebba4f67b2e6
