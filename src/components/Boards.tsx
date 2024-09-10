import { useEffect, useState } from 'react';
import { Trash, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import supabase from '../utils/supabase';

export function Boards({ user }: any) {
  const [boards, setBoards] = useState<any[]>([]); // Initialize as an empty array

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const { data, error } = await supabase.from('borders').select('*');
        if (error) throw error;
        setBoards(data);
      } catch (error) {
        console.error('Error fetching boards:', error);
      }
    };
    fetchBoards();
  }, []);

  const addBorder = async () => {
    try {
      const { data, error } = await supabase
        .from('borders')
        .insert([{ border_name: 'New Board', user_id: user.email }])
        .select();

      if (error) throw error;

      setBoards((prevBoards) => [...prevBoards, ...data]); // Spread 'data' properly since it's an array
    } catch (error) {
      console.error('Error adding board:', error);
    }
  };

  const deleteBorder = async (id: string) => {
    try {
      const { error } = await supabase.from('borders').delete().eq('id', id);
      if (error) throw error;

      setBoards((prevBoards) => prevBoards.filter((board) => board.id !== id));
    } catch (error) {
      console.error('Error deleting board:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Your Boards</h1>
      <div className="w-full overflow-x-auto rounded-md border">
        <div className="flex space-x-4 p-4">
          {boards?.map((border) => (
            <motion.div
              key={border.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-64 h-40 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
                <div className="p-4 flex flex-col justify-between h-full">
                  <h2 className="text-xl font-semibold text-gray-800 truncate">
                    {border.border_name}
                  </h2>
                  <div className="flex justify-end">
                    <button
                      onClick={() => deleteBorder(border.id)}
                      className="text-gray-500 hover:text-red-500 transition-colors duration-200"
                    >
                      <Trash className="h-5 w-5" />
                      <span className="sr-only">Delete board</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div
              className="w-64 h-40 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center rounded-lg cursor-pointer"
              onClick={addBorder}
            >
              <div className="p-4 flex flex-col items-center">
                <Plus className="h-12 w-12 text-gray-400 mb-2" />
                <p className="text-gray-600 font-semibold">Add Board</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
