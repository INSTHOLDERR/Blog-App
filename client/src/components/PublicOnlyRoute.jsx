// components/PublicOnlyRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicOnlyRoute = ({ children }) => {
  const userId = localStorage.getItem("userId");
  return userId ? <Navigate to="/" replace /> : children;
};

export default PublicOnlyRoute;
