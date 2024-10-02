import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
} from '../ui/alert-dialog';
import { Button } from '../ui/button';
import axios from 'axios';
export const DeleteTaskButton = ({ taskId }: any) => {
  const queryClient = useQueryClient();

  // Mutation for deleting a column
  const deleteTaskMutation = useMutation({
    mutationFn: async () => {
      await axios.delete(`http://localhost:5000/tasks/${taskId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks']);
    },
    onError: (error) => {
      console.error('Error deleting Task:', error);
    },
  });

  const handleDelete = () => {
    deleteTaskMutation.mutate();
  };

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
            Are you sure you want to delete this Task? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="space-x-2">
          <AlertDialogCancel asChild>
            <Button variant="outline" className="text-gray-600">
              Cancel
            </Button>
          </AlertDialogCancel>
          <Button
            onClick={handleDelete}
            variant="destructive"
            className="bg-red-600 text-white"
          >
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
