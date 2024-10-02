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
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IBoard, IColumn } from '../../../../types/types';
interface CreateColumnButtonProps {
  activeBoard: IBoard;
}
export const CreateColumnButton = ({
  activeBoard,
}: CreateColumnButtonProps) => {
  const [newColumnTitle, setNewColumnTitle] = useState<string>('');
  const [newColumnDescription, setNewColumnDescription] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();

  // Mutation to add a new column
  const addColumnMutation = useMutation({
    mutationFn: async (newColumn: IColumn) => {
      const response = await axios.post<IColumn>(
        `http://localhost:5000/columns`,
        newColumn
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['columns'],
        (oldColumns: IColumn[] | undefined) => {
          return oldColumns ? [...oldColumns, data] : [data];
        }
      );
      setNewColumnTitle(''); // Reset the input after success
      setIsDialogOpen(false); // Close the dialog
    },
    onError: (error) => {
      console.error('Error adding column:', error);
    },
  });

  const handleAddColumn = () => {
    addColumnMutation.mutate({
      id: uuidv4(),
      title: newColumnTitle,
      description: newColumnDescription,
      boardId: activeBoard.id,
      order: 0,
    });
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <button
          onClick={() => setIsDialogOpen(true)}
          className="flex justify-center items-center h-[20px] w-[350px] min-w-[350px] cursor-pointer border-b-2 p-4 hover:scale-105 transition"
        >
          <div className="flex gap-2">
            <Plus />
            Add Column
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="bg-white text-gray-800 border border-gray-300 rounded-lg shadow-xl max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-600">
            Create a new column
          </DialogTitle>
          <DialogDescription className="text-gray-600 mt-2">
            Add a title for your new column.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-6">
          <div className="space-y-2">
            <label
              htmlFor="columnTitle"
              className="text-sm font-medium text-gray-700"
            >
              Column Title
            </label>
            <Input
              id="columnTitle"
              placeholder="Enter column title"
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              className="bg-gray-100 text-gray-800 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 rounded-md transition-all duration-200 placeholder:text-gray-500"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="columnTitle"
              className="text-sm font-medium text-gray-700"
            >
              Column Desctiption
            </label>
            <Input
              id="columnTitle"
              placeholder="Enter column title"
              value={newColumnDescription}
              onChange={(e) => setNewColumnDescription(e.target.value)}
              className="bg-gray-100 text-gray-800 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 rounded-md transition-all duration-200 placeholder:text-gray-500"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleAddColumn}
            className="bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 rounded-full px-6 py-2 shadow-md hover:shadow-lg"
          >
            Add Column
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
