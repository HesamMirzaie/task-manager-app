// /src/hooks/useAuth.js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem(
      'sb-mgfzsdjjigxhvjpkxtnv-auth-token'
    );
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem(
        'sb-mgfzsdjjigxhvjpkxtnv-auth-token'
      );
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    if (!user) {
      navigate('/login');
    }

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [user, navigate]);

  return user;
};

export default useAuth;
