import { useState } from 'react';
import { Task } from '../../../../pages/dashboard/board page/KanbanBoard';
import axios from 'axios';
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
import { Trash2 } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const DeleteTaskButton = ({ task }: { task: Task }) => {
  const queryClient = useQueryClient();
  const [isDeleting, setIsDeleting] = useState(false);

  // Mutation to delete the task
  const deleteTaskMutation = useMutation(
    async (taskId: string) => {
      await axios.delete(`http://localhost:5000/tasks/${taskId}`);
    },
    {
      onMutate: (taskId: string) => {
        setIsDeleting(true);
        // Optimistically update the cache
        queryClient.setQueryData(
          ['tasks', task.columnId],
          (oldTasks: Task[] | undefined) => {
            return oldTasks ? oldTasks.filter((t) => t.id !== taskId) : [];
          }
        );
      },
      onError: (error) => {
        console.error('Error deleting task:', error);
      },
      onSettled: () => {
        setIsDeleting(false);
        queryClient.invalidateQueries(['tasks', task.columnId]);
      },
    }
  );

  const handleDelete = () => {
    deleteTaskMutation.mutate(task.id);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:text-red-400 transition-colors duration-200"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-gray-900 text-white border border-gray-700 rounded-lg shadow-2xl max-w-md mx-auto">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-bold text-red-400">
            Delete Task
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-400 mt-2">
            Are you sure you want to delete the task "{task.title}"? This action
            cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-6 space-x-4">
          <AlertDialogCancel asChild>
            <Button
              variant="outline"
              className="bg-transparent text-gray-300 border-gray-600 hover:bg-gray-800 hover:text-white transition-colors duration-200"
            >
              Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 text-white hover:bg-red-700 transition-colors duration-200 rounded-full px-6 py-2 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
