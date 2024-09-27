import { Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { Button } from './ui/button';
import { useState } from 'react';
import axios from 'axios';

export const DeleteBoardButton = ({ board, setBoards }: any) => {
  const [deleteBoardId, setDeleteBoardId] = useState<string | null>(null);

  const deleteBoard = async (id: string): Promise<void> => {
    try {
      await axios.delete(`http://localhost:5000/boards/${id}`);
      setBoards((prevBoards: any) =>
        prevBoards.filter((board: any) => board.id !== id)
      );
      setDeleteBoardId(null); // Close the alert dialog after deleting
    } catch (error) {
      console.error('Error deleting board:', error);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            setDeleteBoardId(board.id); // Set the board ID to delete
          }}
          className="text-gray-400 hover:text-white"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-gray-800 text-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Board</AlertDialogTitle>
          <AlertDialogDescription className="text-gray-400">
            Are you sure you want to delete this board? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="outline" onClick={() => setDeleteBoardId(null)}>
            Cancel
          </Button>
          <Button
            onClick={() => deleteBoard(deleteBoardId!)}
            variant="destructive"
          >
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
