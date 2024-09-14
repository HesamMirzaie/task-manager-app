import { useState } from 'react';
import { Trash, Pen } from 'lucide-react';
import { motion } from 'framer-motion';
import { useBoardStore } from '../../store/useBoardStore';
import { EditBoardDialog } from './EditBoardDialog';
import { DeleteBoardDialog } from './DeleteBoardDialog';

interface BoardProps {
  board: any;
}

export function Board({ board }: BoardProps) {
  const { editBoard, deleteBoard } = useBoardStore();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleEdit = (newName: string) => {
    editBoard(board.id, newName);
    setIsEditDialogOpen(false);
  };

  const handleDelete = () => {
    deleteBoard(board.id);
    setIsDeleteDialogOpen(false);
  };

  return (
    <motion.div
      onClick={() => console.log('Move to this board page')}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden w-72"
    >
      <div className="p-6 flex flex-col justify-between h-full">
        <h2 className="text-xl font-semibold text-indigo-800 truncate mb-4">
          {board.border_name}
        </h2>

        <div className="flex justify-end space-x-2">
          <button
            onClick={() => setIsEditDialogOpen(true)}
            className="text-indigo-500 hover:text-indigo-700 transition-colors duration-200"
            aria-label="Edit board"
          >
            <Pen className="h-5 w-5" />
          </button>

          <button
            onClick={() => setIsDeleteDialogOpen(true)}
            className="text-red-500 hover:text-red-700 transition-colors duration-200"
            aria-label="Delete board"
          >
            <Trash className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Edit Dialog */}
      <EditBoardDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSave={handleEdit}
        currentName={board.border_name}
      />

      {/* Delete Dialog */}
      <DeleteBoardDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onDelete={handleDelete}
      />
    </motion.div>
  );
}
