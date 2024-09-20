import { useEffect, useState } from 'react';
import { Boards } from '../components/board/Boards';
import { Navbar } from '../components/Navbar';
import supabase from '../utils/supabase';
import { useNavigate } from 'react-router-dom';

export default function App() {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem(
      'sb-sqsnesmlugmadtodyovy-auth-token'
    );
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user]);

  const handleLogOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="overflow-x-hidden">
      <Navbar handleLogOut={handleLogOut} user={user} />
      {user ? <Boards user={user.user} /> : <div>No User Found!!!</div>}
    </div>
  );
}
