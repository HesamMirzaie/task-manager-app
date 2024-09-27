import { useState } from 'react';
import { Task } from '../../../../pages/dashboard/board page/KanbanBoard';
import axios from 'axios';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../../../ui/alert-dialog';
import { Button } from '../../../ui/button';
import { Trash2 } from 'lucide-react';

export const DeleteTaskButton = ({ task, columns, setColumns }: any) => {
  const [selectedTaskForDelete, setSelectedTaskForDelete] =
    useState<Task | null>(null);

  // Delete task
  const deleteTask = async (taskId: string) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${taskId}`);
      const updatedColumns = columns.map((col: any) => ({
        ...col,
        tasks: col.tasks?.filter((task: any) => task.id !== taskId),
      }));
      setColumns(updatedColumns);
      setSelectedTaskForDelete(null);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-red-400 hover:text-red-600 hover:bg-gray-600"
          onClick={() => setSelectedTaskForDelete(task)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-gray-800 text-gray-100">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this task?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div className="flex justify-end gap-2 mt-4">
          <Button
            variant="ghost"
            onClick={() => setSelectedTaskForDelete(null)}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() =>
              selectedTaskForDelete && deleteTask(selectedTaskForDelete.id)
            }
          >
            Delete
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
