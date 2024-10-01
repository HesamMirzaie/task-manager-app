import { Bell, Search, Settings } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import useAuthStore from '../store/useUser';

export const Navbar = () => {
  const { user } = useAuthStore((state) => state.user);

  return (
    <nav className="flex items-center justify-between p-4 bg-white border-b">
      <div className="flex items-center w-full max-w-sm relative">
        <Search className="w-4 h-4 mr-2 text-gray-400 absolute left-2" />
        <Input type="search" className="w-full " />
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <Settings className="w-5 h-5 text-gray-600" />
        </Button>
        <Button variant="ghost" size="icon">
          <Bell className="w-5 h-5 text-gray-600" />
        </Button>
        <div className="flex items-center space-x-2">
          <p className="w-8 h-8 flex justify-center items-center text-sm font-medium rounded-full bg-gray-200 text-gray-700">
            {[...user.email].splice(0, 2).join('').toUpperCase()}
          </p>
          <span className="text-sm font-medium text-gray-700">
            {user.email}
          </span>
        </div>
      </div>
    </nav>
  );
};
