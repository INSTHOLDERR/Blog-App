import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import axios from 'axios';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isNavShowing, setIsNavShowing] = useState(window.innerWidth > 800);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (token && userId) {
      setIsLoggedIn(true);

      axios.get(`http://localhost:5000/api/users/${userId}`)
        .then(response => {
          setUserName(response.data.name);
        })
        .catch(error => {
          console.error('Error fetching user:', error.response?.data || error.message);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    setUserName('');
    navigate('/');
    window.location.reload();
  };

  const toggleNavHandler = () => {
    setIsNavShowing(prev => !prev);
  };

  const closeNavHandler = () => {
    if (window.innerWidth < 800) {
      setIsNavShowing(false);
    }
  };

  return (
    <nav>
      <div className="container nav__container">
        <Link to="/" className="nav__logo" onClick={closeNavHandler}>
          <h1>BLOG</h1>
        </Link>

        <ul className={`nav__menu ${isNavShowing ? 'show' : 'hide'}`}>
          {isLoggedIn ? (
            <>
              <li><Link to={`/profile/${localStorage.getItem('userId')}`} onClick={closeNavHandler}>{userName}</Link></li>
              <li><Link to="/create" onClick={closeNavHandler}>Create Post</Link></li>
              <li><Link to="/authors" onClick={closeNavHandler}>Authors</Link></li>
              <li><Link onClick={handleLogout}>Logout</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/login" onClick={closeNavHandler}>Login</Link></li>
              <li><Link to="/register" onClick={closeNavHandler}>Register</Link></li>
            </>
          )}
        </ul>

        <button className="nav__toggle-btn" onClick={toggleNavHandler}>
          {isNavShowing ? <AiOutlineClose /> : <FaBars />}
        </button>
      </div>
    </nav>
  );
};

export default Header;
