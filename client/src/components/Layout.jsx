<<<<<<< HEAD
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
const Layout = () => (
  <div className="app">
    <Header />
    <main className="main-content"><Outlet /></main>
    <Footer />
  </div>
);
=======
// Layout.jsx
import React, { useEffect, useState } from 'react';
import { Outlet } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id && !userId) {
      window.location.reload(); 
    }
  }, [userId]);

  return (
     <div className="app">
      <Header key={userId} />
       <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

>>>>>>> d622943dd43b7c5375060cca52dbebba4f67b2e6
export default Layout;
