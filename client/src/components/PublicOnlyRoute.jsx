import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

const PublicOnlyRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  return currentUser ? <Navigate to="/" replace /> : children;
};

export default PublicOnlyRoute;
