import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import axios from 'axios';
import "../csss/nav.css";
const Header = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isNavShowing, setIsNavShowing] = useState(window.innerWidth > 800);
  const [userName, setUserName] = useState('');

  const navigate = useNavigate();

  // CHECK LOGIN STATUS
  useEffect(() => {

    const checkLogin = async () => {

      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      if (token && userId) {

        setIsLoggedIn(true);

        try {

          const response = await axios.get(
            `http://localhost:5000/api/users/${userId}`
          );

          setUserName(response.data.name);

        } catch (error) {

          console.error(
            'Error fetching user:',
            error.response?.data || error.message
          );

        }

      } else {

        setIsLoggedIn(false);
        setUserName('');

      }
    };

    // INITIAL CHECK
    checkLogin();

    // LISTEN STORAGE EVENT
    window.addEventListener("storage", checkLogin);

    return () => {
      window.removeEventListener("storage", checkLogin);
    };

  }, []);

  // LOGOUT
  const handleLogout = () => {

    localStorage.removeItem('token');
    localStorage.removeItem('userId');

    // UPDATE NAVBAR INSTANTLY
    window.dispatchEvent(new Event("storage"));

    navigate('/');
  };

  // MOBILE NAVBAR TOGGLE
  const toggleNavHandler = () => {
    setIsNavShowing((prev) => !prev);
  };

  // CLOSE MOBILE NAVBAR
  const closeNavHandler = () => {

    if (window.innerWidth < 800) {
      setIsNavShowing(false);
    }

  };

  return (

    <nav>

      <div className="container nav__container">

        {/* LOGO */}
        <Link
          to="/"
          className="nav__logo"
          onClick={closeNavHandler}
        >
          <h1>BLOG</h1>
        </Link>

        {/* NAV MENU */}
        <ul className={`nav__menu ${isNavShowing ? 'show' : 'hide'}`}>

          {isLoggedIn ? (

            <>
              <li>
                <Link
                  to={`/profile/${localStorage.getItem('userId')}`}
                  onClick={closeNavHandler}
                >
                  {userName}
                </Link>
              </li>

              <li>
                <Link
                  to="/create"
                  onClick={closeNavHandler}
                >
                  Create Post
                </Link>
              </li>

              <li>
                <Link
                  to="/authors"
                  onClick={closeNavHandler}
                >
                  Authors
                </Link>
              </li>

              <li>
                <button
                  className="logout-btn"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </>

          ) : (

            <>
              <li>
                <Link
                  to="/login"
                  onClick={closeNavHandler}
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  to="/register"
                  onClick={closeNavHandler}
                >
                  Register
                </Link>
              </li>
            </>

          )}

        </ul>

        {/* MOBILE BUTTON */}
        <button
          className="nav__toggle-btn"
          onClick={toggleNavHandler}
        >
          {isNavShowing ? <AiOutlineClose /> : <FaBars />}
        </button>

      </div>

    </nav>

  );
};

export default Header;