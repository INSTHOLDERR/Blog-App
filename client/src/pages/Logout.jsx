<<<<<<< HEAD
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');
    window.dispatchEvent(new Event('storage'));
    navigate('/');
  }, [navigate]);
  return null;
};
export default Logout;
=======
import React from 'react'

const Logout = () => {
  return (
    <div>
      Logout
    </div>
  )
}

export default Logout
>>>>>>> d622943dd43b7c5375060cca52dbebba4f67b2e6
