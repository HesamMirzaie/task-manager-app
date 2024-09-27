import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import { Input } from '../ui/input';
import { Column } from '../../pages/dashboard/boardId/KanbanBoard';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
export const AddColumnButton = ({ setColumns, columns, boardId }: any) => {
  const [newColumnTitle, setNewColumnTitle] = useState('');

  // Add new column
  const addColumn = async () => {
    if (newColumnTitle.trim()) {
      const newColumn: Column = {
        id: uuidv4(),
        title: newColumnTitle,
        boardId: boardId,
      };

      try {
        const response = await axios.post<Column>(
          `http://localhost:5000/columns`,
          newColumn
        );
        setColumns([...columns, response.data]);
        setNewColumnTitle('');
      } catch (error) {
        console.error('Error adding column:', error);
      }
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center">
          <Plus className="mr-2 h-4 w-4" />
          Add Column
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-900 text-gray-100">
        <DialogHeader>
          <DialogTitle>Add New Column</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <Input
            value={newColumnTitle}
            onChange={(e) => setNewColumnTitle(e.target.value)}
            placeholder="Column Title"
            className="mb-4"
          />
          <Button variant="default" onClick={addColumn}>
            Add Column
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
