import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import axios from 'axios'; 
const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isNavShowing, setIsNavShowing] = useState(window.innerWidth > 800 ? true : false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (token && userId) {
      setIsLoggedIn(true);
      
      axios.get(`http://localhost:5000/api/users/${userId}`)
        .then(response => {
          const user = response.data;
          setUserName(user.name); 
        })
        .catch(error => {
          console.error('Error fetching user:', error.response.data);
        });

      
      
    }
  }, []);

  const closeNavHandler = () => {
    if (window.innerWidth < 800) {
      setIsNavShowing(false);
    } else {
      setIsNavShowing(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    Navigate('/')
    setIsLoggedIn(false);
    setUserName(''); 
    window.location.reload();
  };

  return (
    <nav>
      <div className="container nav__container">
        <Link to="/" className='nav__logo' onClick={closeNavHandler}>
          <h1>BLOG</h1>
        </Link>

        {isLoggedIn ? (
          <ul className="nav__menu">
            <li><Link to="/profile/:id" onClick={closeNavHandler}>{userName}</Link></li>
            <li><Link to="/create" onClick={closeNavHandler}>Create Post</Link></li>
            <li><Link to="/authors" onClick={closeNavHandler}>Authors</Link></li>
            <li><Link onClick={handleLogout}>Logout</Link></li>
          </ul>
        ) : (
          <ul className="nav__menu">
            <li><Link to="/login" onClick={closeNavHandler}>Login</Link></li>
            <li><Link to="/register" onClick={closeNavHandler}>Register</Link></li>
          </ul>
        )}

        <button className="nav__toggle-btn" onClick={() => setIsNavShowing(!isNavShowing)}>
          {isNavShowing ? <AiOutlineClose /> : <FaBars />}
        </button>
      </div>
    </nav>
  );
};

export default Header;
