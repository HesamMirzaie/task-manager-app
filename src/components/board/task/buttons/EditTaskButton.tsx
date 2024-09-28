'use client';

import { Button } from '../../../ui/button';
import { Edit } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../ui/dialog';
import { Input } from '../../../ui/input';
import { Textarea } from '../../../ui/textarea';
import { useState } from 'react';
import { Task } from '../../../../pages/dashboard/board page/KanbanBoard';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const EditTaskButton = ({ task }: { task: Task }) => {
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  // Mutation to edit the task
  const editTaskMutation = useMutation(
    async (updatedTask: Task) => {
      const response = await axios.put<Task>(
        `http://localhost:5000/tasks/${updatedTask.id}`,
        updatedTask
      );
      return response.data;
    },
    {
      onSuccess: (data) => {
        // Update the cache with the new task data
        queryClient.setQueryData(
          ['tasks', task.columnId],
          (oldTasks: Task[] | undefined) => {
            return oldTasks
              ? oldTasks.map((t) => (t.id === data.id ? data : t))
              : [];
          }
        );
        setEditingTask(null);
      },
      onError: (error) => {
        console.error('Error updating task:', error);
      },
      onSettled: () => {
        setIsLoading(false);
      },
    }
  );

  const handleEditClick = () => {
    setEditingTask(task);
  };

  const handleSaveChanges = () => {
    if (editingTask && editingTask.title.trim()) {
      setIsLoading(true);
      editTaskMutation.mutate(editingTask);
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="text-gray-400 hover:text-indigo-400 transition-colors duration-200"
        onClick={handleEditClick}
      >
        <Edit className="h-4 w-4" />
      </Button>
      <Dialog open={!!editingTask} onOpenChange={() => setEditingTask(null)}>
        <DialogContent className="bg-gray-900 text-white border border-gray-700 rounded-lg shadow-2xl max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-indigo-400">
              Edit Task
            </DialogTitle>
            <DialogDescription className="text-gray-400 mt-2">
              Update the title and description of your task.
            </DialogDescription>
          </DialogHeader>
          {editingTask && (
            <div className="mt-6 space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="taskTitle"
                  className="text-sm font-medium text-gray-300"
                >
                  Task Title
                </label>
                <Input
                  id="taskTitle"
                  value={editingTask.title}
                  onChange={(e) =>
                    setEditingTask({
                      ...editingTask,
                      title: e.target.value,
                    })
                  }
                  placeholder="Enter task title"
                  className="bg-gray-800 text-white border-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 rounded-md transition-all duration-200"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="taskDescription"
                  className="text-sm font-medium text-gray-300"
                >
                  Task Description
                </label>
                <Textarea
                  id="taskDescription"
                  value={editingTask.description}
                  onChange={(e) =>
                    setEditingTask({
                      ...editingTask,
                      description: e.target.value,
                    })
                  }
                  placeholder="Enter task description"
                  className="bg-gray-800 text-white border-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 rounded-md transition-all duration-200"
                />
              </div>
            </div>
          )}
          <DialogFooter className="mt-6">
            <Button
              onClick={handleSaveChanges}
              disabled={isLoading || !editingTask}
              className="bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200 rounded-full px-6 py-2 shadow-md hover:shadow-lg w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
