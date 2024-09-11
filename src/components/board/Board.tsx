import { Trash, Pen } from 'lucide-react';
import { motion } from 'framer-motion';

interface BoardProps {
  board: any;
  editBoard: (id: string, newName: string) => void;
  deleteBoard: (id: string) => void;
}

export function Board({ board, editBoard, deleteBoard }: BoardProps) {
  const handleEdit = () => {
    const newName =
      prompt('Enter new board name', board.border_name) || board.border_name;
    editBoard(board.id, newName);
  };

  return (
    <motion.div
      onClick={() => console.log('Move to this board page')}
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
            onClick={handleEdit}
            className="text-indigo-500 hover:text-indigo-700 transition-colors duration-200"
            aria-label="Edit board"
            data-no-dnd="true"
          >
            <Pen className="h-5 w-5" />
          </button>
          <button
            onClick={() => deleteBoard(board.id)}
            className="text-red-500 hover:text-red-700 transition-colors duration-200"
            aria-label="Delete board"
            data-no-dnd="true"
          >
            <Trash className="h-5 w-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
