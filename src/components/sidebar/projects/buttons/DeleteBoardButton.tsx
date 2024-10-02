import { useState } from 'react';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
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
} from '../../../ui/alert-dialog';
import { Button } from '../../../ui/button';

export const DeleteBoardButton = ({ board, setActiveBoard }: any) => {
  const [deleteBoardId, setDeleteBoardId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // Refactor mutation to v5 syntax
  const deleteBoardMutation = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`http://localhost:5000/boards/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['boards']); // Refresh the 'boards' query after deletion
      setDeleteBoardId(null); // Close the dialog
      setActiveBoard('');
    },
    onError: (error) => {
      console.error('Error deleting board:', error);
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="w-full text-sm py-1 text-red-600">
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white text-gray-800">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-bold">
            Confirm Deletion
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm">
            Are you sure you want to delete this Project? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="space-x-4">
          <AlertDialogCancel asChild>
            <Button
              variant="outline"
              onClick={() => setDeleteBoardId(null)}
              className="text-gray-600"
            >
              Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              onClick={() => {
                if (deleteBoardId) {
                  deleteBoardMutation.mutate(deleteBoardId);
                }
              }}
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
