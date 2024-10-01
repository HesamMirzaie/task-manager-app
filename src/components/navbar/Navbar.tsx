import { Settings } from 'lucide-react';
import { Button } from '../ui/button';
import { SearchBar } from './SearchBar';
import { UserCard } from './UserCard';
import { DarkModeButton } from './DarkModeButton';

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-white border-b">
      <SearchBar />
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <Settings className="w-5 h-5 text-gray-600" />
        </Button>
        <DarkModeButton />
        <UserCard />
      </div>
    </nav>
  );
};
