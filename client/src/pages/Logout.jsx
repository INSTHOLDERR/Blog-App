import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  useEffect(() => {
    logout();
    navigate('/');
  }, [navigate, logout]);
  return null;
};
export default Logout;
