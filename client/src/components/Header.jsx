import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const API = 'http://localhost:5000';
const CATS = ['Agriculture','Business','Education','Entertainment','Art','Investment','Weather','Uncategorized'];

export default function Header() {
  const [loggedIn,  setLoggedIn]  = useState(false);
  const [userName,  setUserName]  = useState('');
  const [avatar,    setAvatar]    = useState('');
  const [userId,    setUserId]    = useState('');
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [userDrop,  setUserDrop]  = useState(false);
  const [elevated,  setElevated]  = useState(false);
  const navigate  = useNavigate();
  const location  = useLocation();
  const dropRef   = useRef(null);

  const check = async () => {
    const t = localStorage.getItem('token');
    const u = localStorage.getItem('userId');
    if (t && u) {
      setLoggedIn(true); setUserId(u);
      try {
        const { data } = await axios.get(`${API}/api/users/${u}`);
        setUserName(data.name);
        setAvatar(data.avatar ? `${API}/uploads/${data.avatar}` : '');
      } catch {}
    } else { setLoggedIn(false); setUserName(''); setAvatar(''); setUserId(''); }
  };

  useEffect(() => {
    check();
    window.addEventListener('storage', check);
    return () => window.removeEventListener('storage', check);
  }, []);

  useEffect(() => {
    const fn = () => setElevated(window.scrollY > 8);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setMenuOpen(false); setUserDrop(false); }, [location.pathname]);

  useEffect(() => {
    const fn = e => { if (dropRef.current && !dropRef.current.contains(e.target)) setUserDrop(false); };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  const logout = () => {
    localStorage.removeItem('token'); localStorage.removeItem('userId'); localStorage.removeItem('tokenExpiration');
    window.dispatchEvent(new Event('storage'));
    navigate('/');
  };

  const initial = userName?.[0]?.toUpperCase() || 'U';
  const active  = p => location.pathname === p ? ' active' : '';

  return (
    <>
      <header className={`site-header${elevated ? ' elevated' : ''}`}>
        <div className="container header-inner">
          <Link to="/" className="logo-wrap">
            <div className="logo-icon">✍️</div>
            <span className="logo-text">BlogSpace</span>
          </Link>

          <nav className="desktop-nav">
            <Link to="/" className={`nav-link${active('/')}`}>Home</Link>
            <div className="nav-dropdown-wrap">
              <button className="nav-link">Categories ▾</button>
              <div className="nav-dropdown">
                {CATS.map(c => <Link key={c} to={`/posts/categories/${c}`} className="nav-dropdown-item">{c}</Link>)}
              </div>
            </div>
            <Link to="/authors" className={`nav-link${active('/authors')}`}>Authors</Link>
            {loggedIn && <Link to="/create" className={`nav-link${active('/create')}`}>Write</Link>}
          </nav>

          <div className="header-right">
            {loggedIn ? (
              <>
                <Link to="/create" className="btn btn-primary btn-sm write-btn-desktop">+ Write</Link>
                <div className="user-dropdown-wrap" ref={dropRef}>
                  <button className="user-btn" onClick={() => setUserDrop(v => !v)}>
                    <div className="user-avatar-sm">
                      {avatar ? <img src={avatar} alt="" onError={e => e.target.style.display='none'} /> : <div className="user-avatar-initials">{initial}</div>}
                    </div>
                    <span className="user-name-label">{userName}</span>
                    <svg className="chevron-icon" width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M6 8L1 3h10z"/></svg>
                  </button>
                  {userDrop && (
                    <div className="user-dropdown">
                      <div className="ud-header">
                        <div className="ud-avatar">
                          {avatar ? <img src={avatar} alt="" onError={e => e.target.style.display='none'} /> : <div className="ud-avatar-fallback">{initial}</div>}
                        </div>
                        <div><p className="ud-name">{userName}</p><p className="ud-role">Author</p></div>
                      </div>
                      <div className="ud-body">
                        <Link to={`/profile/${userId}`}    className="ud-item"><span className="ud-item-icon">👤</span>My Profile</Link>
                        <Link to={`/myposts/${userId}`}    className="ud-item"><span className="ud-item-icon">📚</span>My Posts</Link>
                        <Link to="/create"                 className="ud-item"><span className="ud-item-icon">✍️</span>Write Post</Link>
                        <div className="ud-divider" />
                        <button onClick={logout}           className="ud-item ud-logout"><span className="ud-item-icon">🚪</span>Logout</button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="auth-nav-btns">
                <Link to="/login"    className="btn btn-ghost btn-sm">Login</Link>
                <Link to="/register" className="btn btn-primary btn-sm">Get Started</Link>
              </div>
            )}
            <button className="hamburger" onClick={() => setMenuOpen(v => !v)}>
              <span className={`ham-bar${menuOpen?' open':''}`}/>
              <span className={`ham-bar${menuOpen?' open':''}`}/>
              <span className={`ham-bar${menuOpen?' open':''}`}/>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="mobile-menu">
            {loggedIn && (
              <div style={{display:'flex',alignItems:'center',gap:'.75rem',padding:'.75rem 1rem',background:'var(--indigo-pale)',borderRadius:'var(--r-lg)',marginBottom:'.5rem'}}>
                <div className="user-avatar-sm">{avatar?<img src={avatar} alt=""/>:<div className="user-avatar-initials">{initial}</div>}</div>
                <div><p style={{fontWeight:700,fontSize:'.875rem',color:'var(--ink)'}}>{userName}</p><p style={{fontSize:'.75rem',color:'var(--ink-5)'}}>Author</p></div>
              </div>
            )}
            <Link to="/"        className="mobile-nav-link">🏠 Home</Link>
            <Link to="/authors" className="mobile-nav-link">✍️ Authors</Link>
            {loggedIn && <Link to="/create"              className="mobile-nav-link">📝 Write Post</Link>}
            {loggedIn && <Link to={`/profile/${userId}`} className="mobile-nav-link">👤 My Profile</Link>}
            {loggedIn && <Link to={`/myposts/${userId}`} className="mobile-nav-link">📚 My Posts</Link>}
            <p className="mobile-cat-label">Categories</p>
            {CATS.map(c => <Link key={c} to={`/posts/categories/${c}`} className="mobile-cat-link">{c}</Link>)}
            <div className="mobile-divider"/>
            {loggedIn
              ? <button onClick={logout} className="mobile-logout-btn">Logout</button>
              : <div className="mobile-auth-btns">
                  <Link to="/login"    className="btn btn-outline" style={{justifyContent:'center'}}>Login</Link>
                  <Link to="/register" className="btn btn-primary" style={{justifyContent:'center'}}>Get Started</Link>
                </div>
            }
          </div>
        )}
      </header>
    </>
  );
}
