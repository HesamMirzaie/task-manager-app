import { useState } from 'react';
import { User, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useAuthStore from '../store/useUser';
import supabase from '../utils/supabase';
import { useNavigate } from 'react-router-dom';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  return (
    <nav className=" bg-red-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="ml-2 text-xl font-bold text-blue-600">
                TaskChi
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
