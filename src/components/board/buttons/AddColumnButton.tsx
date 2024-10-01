import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Plus } from 'lucide-react';
import { Input } from '../../ui/input';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TColumn } from '../../../types/types';

export const AddColumnButton = ({
  boardId,
}: {
  columns: TColumn[];
  boardId: string;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState('');

  const queryClient = useQueryClient();

  // Mutation to add a new column
  const addColumnMutation = useMutation(
    async (newColumn: TColumn) => {
      const response = await axios.post<TColumn>(
        `http://localhost:5000/columns`,
        newColumn
      );
      return response.data;
    },
    {
      onSuccess: (data) => {
        // Update the columns cache after successful mutation
        queryClient.setQueryData(
          ['columns', boardId],
          (oldColumns: TColumn[] | undefined) => {
            return oldColumns ? [...oldColumns, data] : [data];
          }
        );
        setNewColumnTitle('');
        setIsDialogOpen(false); // Close dialog after creating the column
      },
      onError: (error) => {
        console.error('Error adding column:', error);
      },
    }
  );

  const addColumn = () => {
    if (newColumnTitle.trim()) {
      const newColumn: TColumn = {
        id: uuidv4(),
        title: newColumnTitle,
        boardId: boardId,
      };
      addColumnMutation.mutate(newColumn);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200 rounded-full px-4 py-2 flex items-center space-x-2 shadow-lg hover:shadow-xl border-none"
        >
          <Plus className="h-5 w-5" />
          <span>Add Column</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-900 text-white border border-gray-700 rounded-lg shadow-2xl max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-indigo-400">
            Add New Column
          </DialogTitle>
          <DialogDescription className="text-gray-400 mt-2">
            Enter a title for your new column.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-2 space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="columnTitle"
              className="text-sm font-medium text-gray-300"
            >
              Column Title
            </label>
            <Input
              id="columnTitle"
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              placeholder="Enter column title"
              className="bg-gray-800 text-white border-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 rounded-md transition-all duration-200 placeholder:text-gray-500"
            />
          </div>
        </div>
        <DialogFooter className="mt-6">
          <Button
            onClick={addColumn}
            className="bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200 rounded-full px-6 py-2 shadow-md hover:shadow-lg w-full"
          >
            Add Column
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
