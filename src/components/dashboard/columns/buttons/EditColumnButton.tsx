import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '../../../ui/dialog';
import { Input } from '../../../ui/input';
import axios from 'axios';
import { useState } from 'react';
import { Button } from '../../../ui/button';

export const EditColumnButton = ({ columnId, setIsDropdownOpen }: any) => {
  const [newTitle, setNewTitle] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const editColumnTitleMutation = useMutation({
    mutationFn: async (updatedColumn: { title: string }) => {
      await axios.patch(
        `http://localhost:5000/columns/${columnId}`,
        updatedColumn
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['columns']);
      setIsDialogOpen(false);
      setIsDropdownOpen(false);
    },
    onError: (error) => {
      console.error('Error updating column title:', error);
    },
  });

  const handleEditTitle = () => {
    if (newTitle.trim()) {
      editColumnTitleMutation.mutate({ title: newTitle });
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
            Edit Column Title
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <Input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Enter new column title"
            className="w-full"
          />
        </div>
        <DialogFooter className="mt-4">
          <Button
            variant="outline"
            className="text-gray-600"
            onClick={() => setIsDialogOpen(false)} // بستن دیالوگ
          >
            Cancel
          </Button>
          <Button onClick={handleEditTitle} className="bg-blue-600 text-white">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
