import { useEffect, useState } from 'react';
import { Trash, Plus, Pen } from 'lucide-react';
import { motion } from 'framer-motion';
import supabase from '../utils/supabase';

export function Boards({ user }: { user: { email: string } }) {
  const [boards, setBoards] = useState<any[]>([]);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const { data, error } = await supabase.from('borders').select('*');
        if (error) throw error;
        setBoards(data.filter((board) => board.user_id === user.email));
      } catch (error) {
        console.error('Error fetching boards:', error);
      }
    };
    fetchBoards();
  }, [user.email]);

  const addBoard = async () => {
    try {
      const { data, error } = await supabase
        .from('borders')
        .insert([{ border_name: 'New Board', user_id: user.email }])
        .select();

      if (error) throw error;

      setBoards((prevBoards) => [...prevBoards, ...data]);
    } catch (error) {
      console.error('Error adding board:', error);
    }
  };

  const editBoard = async (id: string, newName: string) => {
    // setIsEditing(true);
    try {
      const { data, error } = await supabase
        .from('borders')
        .update({ border_name: newName })
        .eq('id', id)
        .select();

      if (error) throw error;

      setBoards((prevBoards) =>
        prevBoards.map((board) =>
          board.id === id ? { ...board, border_name: newName } : board
        )
      );
    } catch (error) {
      console.error('Error editing board:', error);
    }
  };

  const deleteBoard = async (id: string) => {
    try {
      const { error } = await supabase.from('borders').delete().eq('id', id);
      if (error) throw error;

      setBoards((prevBoards) => prevBoards.filter((board) => board.id !== id));
    } catch (error) {
      console.error('Error deleting board:', error);
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-purple-50 to-indigo-100 min-h-screen">
      <h1 className="text-4xl font-bold text-indigo-900 mb-8">Your Boards</h1>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {boards?.map((board) => (
          <motion.div
            key={board.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <div className="p-6 flex flex-col justify-between h-full">
              <h2 className="text-xl font-semibold text-indigo-800 truncate mb-4">
                {board.border_name}
              </h2>

              <div className="flex justify-end space-x-2">
                <button
                  onClick={() =>
                    editBoard(
                      board.id,
                      prompt('Enter new board name') || board.border_name
                    )
                  }
                  className="text-indigo-500 hover:text-indigo-700 transition-colors duration-200"
                  aria-label="Edit board"
                >
                  <Pen className="h-5 w-5" />
                </button>
                <button
                  onClick={() => deleteBoard(board.id)}
                  className="text-red-500 hover:text-red-700 transition-colors duration-200"
                  aria-label="Delete board"
                >
                  <Trash className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
        <motion.div
          layout
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-indigo-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
          onClick={addBoard}
        >
          <div className="p-6 flex flex-col items-center justify-center h-full">
            <Plus className="h-12 w-12 text-indigo-500 mb-2" />
            <p className="text-indigo-700 font-semibold">Add Board</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
