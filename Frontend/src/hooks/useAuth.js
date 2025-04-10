import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("useAuth: Token", token);

    if (token) {
      setAuthenticated(true);
      navigate('/dashboard')
    } else {
      setAuthenticated(false);
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    console.log("Authenticated:", authenticated);
  }, [authenticated]);

  return authenticated;
};

export default useAuth;
