import { useState } from 'react';
import { Button } from '../ui/button';
import { Moon, Sun } from 'lucide-react';

export const DarkModeButton = () => {
  const [toggleDarkMode, setToggleDarkMode] = useState(false);
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setToggleDarkMode(!toggleDarkMode)}
    >
      {toggleDarkMode ? (
        <Sun className="w-5 h-5 text-gray-600" />
      ) : (
        <Moon className="w-5 h-5 text-gray-600" />
      )}
    </Button>
  );
};
