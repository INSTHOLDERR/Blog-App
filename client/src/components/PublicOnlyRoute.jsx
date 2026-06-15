<<<<<<< HEAD
import React from 'react';
import { Navigate } from 'react-router-dom';
const PublicOnlyRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? <Navigate to="/" /> : children;
};
=======
// components/PublicOnlyRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicOnlyRoute = ({ children }) => {
  const userId = localStorage.getItem("userId");
  return userId ? <Navigate to="/" replace /> : children;
};

>>>>>>> d622943dd43b7c5375060cca52dbebba4f67b2e6
export default PublicOnlyRoute;
