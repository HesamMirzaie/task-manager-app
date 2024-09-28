import { Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../../ui/alert-dialog';
import { Button } from '../../ui/button';
import { useState } from 'react';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const DeleteBoardButton = ({ board }: any) => {
  const [deleteBoardId, setDeleteBoardId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const deleteBoardMutation = useMutation({
    mutationFn: async () => {
      await axios.delete(`http://localhost:5000/boards/${deleteBoardId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['boards']); // تازه‌سازی کوئری boards پس از حذف
      setDeleteBoardId(null); // بستن دیالوگ
    },
    onError: (error) => {
      console.error('Error deleting board:', error);
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            setDeleteBoardId(board.id);
          }}
          className="text-gray-400 hover:text-red-400 transition-colors duration-200"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-900 text-white border border-gray-700 rounded-lg shadow-2xl max-w-md mx-auto"
      >
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-bold text-red-400">
            Delete Board
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-400 mt-2">
            Are you sure you want to delete this board? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="space-x-4">
          <AlertDialogCancel asChild>
            <Button
              variant="outline"
              onClick={() => setDeleteBoardId(null)}
              className="bg-transparent text-gray-300 border-gray-600 hover:bg-gray-800 hover:text-white transition-colors duration-200"
            >
              Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              onClick={() => deleteBoardMutation.mutate()}
              className="bg-red-600 text-white hover:bg-red-700 transition-colors duration-200 rounded-full px-6 py-2 shadow-md hover:shadow-lg"
            >
              Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
