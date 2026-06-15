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
