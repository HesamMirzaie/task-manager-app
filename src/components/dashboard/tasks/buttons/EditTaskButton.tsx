import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '../../../ui/dialog';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const EditTaskButton = ({ taskId }: { taskId: string }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const queryClient = useQueryClient();

  const editTaskTitleMutation = useMutation({
    mutationFn: async (updatedTask: { title: string }) => {
      await axios.patch(`http://localhost:5000/tasks/${taskId}`, updatedTask);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks']);
      setIsDialogOpen(false);
      // setIsDropdownOpen(false);
    },
    onError: (error) => {
      console.error('Error updating Task title:', error);
    },
  });

  const handleEditTitle = () => {
    if (newTitle.trim()) {
      editTaskTitleMutation.mutate({ title: newTitle });
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full text-sm py-1">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white text-gray-800">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            Edit Task Title
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <Input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Enter new task title"
            className="w-full"
          />
        </div>
        <DialogFooter className="mt-4">
          <Button
            variant="outline"
            className="text-gray-600"
            onClick={() => setIsDialogOpen(false)} // Close the dialog
          >
            Cancel
          </Button>
          <Button
            onClick={handleEditTitle} // Pass newTitle to the mutation
            variant="default"
            className="bg-blue-600 text-white"
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
