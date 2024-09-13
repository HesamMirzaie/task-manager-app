import { useState } from 'react';
import { Trash, Pen } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '../ui/alert-dialog'; // Adjust the path as needed
import { useBoardStore } from '../../store/useBoardStore';

interface BoardProps {
  board: any;
}

export function Board({ board }: BoardProps) {
  const { editBoard, deleteBoard } = useBoardStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State for dialog visibility

  const handleEdit = () => {
    const newName =
      prompt('Enter new board name', board.border_name) || board.border_name;
    editBoard(board.id, newName);
  };

  const handleDelete = () => {
    deleteBoard(board.id);
    setIsDialogOpen(false); // Close dialog after deletion
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
            onClick={handleEdit}
            className="text-indigo-500 hover:text-indigo-700 transition-colors duration-200"
            aria-label="Edit board"
          >
            <Pen className="h-5 w-5" />
          </button>
          <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialogTrigger>
              <button
                onClick={() => setIsDialogOpen(true)}
                className="text-red-500 hover:text-red-700 transition-colors duration-200"
                aria-label="Delete board"
              >
                <Trash className="h-5 w-5" />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent className=" bg-white">
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action will permanently delete the board. Are you sure
                  you want to proceed?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </motion.div>
  );
}
