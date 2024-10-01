import { Search } from 'lucide-react';
import { Input } from '../ui/input';

export const SearchBar = () => {
  return (
    <div className="flex items-center w-full max-w-sm relative">
      <Search className="w-4 h-4 mr-2 text-gray-400 absolute left-2" />
      <Input type="search" className="w-full " />
    </div>
  );
};
