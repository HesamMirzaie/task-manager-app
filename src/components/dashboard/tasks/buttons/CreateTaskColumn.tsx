import { Plus } from 'lucide-react';
import { Button } from '../../../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../ui/dialog';
import { Input } from '../../../ui/input';
import { Textarea } from '../../../ui/textarea';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ITask } from '../../../../types/types';

interface CreateTaskColumnProps {
  columnId: string;
}

export const CreateTaskColumn = ({ columnId }: CreateTaskColumnProps) => {
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [newTaskDescription, setNewTaskDescription] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const addTaskMutation = useMutation({
    mutationFn: async (newTask: ITask) => {
      return await axios.post('http://localhost:5000/tasks', newTask);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      setNewTaskTitle('');
      setNewTaskDescription('');
      setIsDialogOpen(false);
    },
  });

  const handleAddTask = () => {
    addTaskMutation.mutate({
      id: uuidv4(),
      title: newTaskTitle,
      description: newTaskDescription,
      columnId: columnId,
    });
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className="border-blue-300 hover:border-blue-600 border-2 border-dotted text-blue-600 rounded-md px-4 py-2 flex items-center space-x-2"
          onClick={() => setIsDialogOpen(true)}
        >
          <Plus className="h-5 w-5" />
          <span>Add New Task</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white text-gray-800 border border-gray-300 rounded-lg shadow-xl max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-600">
            Create a new task
          </DialogTitle>
          <DialogDescription className="text-gray-600 mt-2">
            Add a title and description for your new task.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-6">
          <div className="space-y-2">
            <label
              htmlFor="taskTitle"
              className="text-sm font-medium text-gray-700"
            >
              Task Title
            </label>
            <Input
              id="taskTitle"
              placeholder="Enter task title"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="bg-gray-100 text-gray-800 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 rounded-md transition-all duration-200 placeholder:text-gray-500"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="taskDescription"
              className="text-sm font-medium text-gray-700"
            >
              Task Description
            </label>
            <Textarea
              id="taskDescription"
              placeholder="Enter task description"
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
              className="bg-gray-100 text-gray-800 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 rounded-md transition-all duration-200 min-h-[100px] placeholder:text-gray-500"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleAddTask}
            className="bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 rounded-full px-6 py-2 shadow-md hover:shadow-lg"
          >
            Add Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
