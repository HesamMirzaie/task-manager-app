import { useState } from 'react';
import { Button } from '../../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../ui/dialog';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Column, Task } from '../../../pages/dashboard/board page/KanbanBoard';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { Plus } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const AddTaskButton = ({ column }: { column: Column }) => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Mutation to add a new task
  const addTaskMutation = useMutation(
    async (newTask: Task) => {
      const response = await axios.post<Task>(
        `http://localhost:5000/tasks`,
        newTask
      );
      return response.data; // Return the added task
    },
    {
      onSuccess: () => {
        // Invalidate the tasks query to refetch data
        queryClient.invalidateQueries(['tasks']);
        setNewTaskTitle(''); // Reset fields
        setNewTaskDescription('');
        setIsDialogOpen(false);
      },
      onError: (error) => {
        console.error('Error adding task:', error);
        setError('Failed to add task. Please try again.');
      },
    }
  );

  const addTask = () => {
    if (newTaskTitle.trim()) {
      const newTask: Task = {
        id: uuidv4(),
        title: newTaskTitle,
        description: newTaskDescription,
        columnId: column.id,
      };
      addTaskMutation.mutate(newTask);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200 rounded-full px-4 py-2 flex items-center space-x-2 shadow-lg hover:shadow-xl border-none"
          onClick={() => setIsDialogOpen(true)}
        >
          <Plus className="h-4 w-4" />
          <span>Add Task</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-900 text-white border border-gray-700 rounded-lg shadow-2xl max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-indigo-400">
            Add New Task
          </DialogTitle>
          <DialogDescription className="text-gray-400 mt-2">
            Create a new task for the column "{column.title}".
          </DialogDescription>
        </DialogHeader>
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
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Enter task title"
              className="bg-gray-800 text-white border-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 rounded-md transition-all duration-200 placeholder:text-gray-500"
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
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
              placeholder="Enter task description"
              className="bg-gray-800 text-white border-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 rounded-md transition-all duration-200 min-h-[100px] placeholder:text-gray-500"
            />
          </div>
        </div>
        {error && (
          <div className="mt-4 p-2 bg-red-900/20 border border-red-500 rounded text-red-400">
            {error}
          </div>
        )}
        <DialogFooter className="mt-6">
          <Button
            onClick={addTask}
            disabled={addTaskMutation.isLoading || !newTaskTitle.trim()}
            className="bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200 rounded-full px-6 py-2 shadow-md hover:shadow-lg w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {addTaskMutation.isLoading ? 'Adding Task...' : 'Add Task'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
