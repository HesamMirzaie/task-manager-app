import { useState } from 'react';
import { Column } from '../../../pages/dashboard/board page/KanbanBoard';
import axios from 'axios';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../../ui/alert-dialog';
import { Button } from '../../ui/button';
import { Trash2 } from 'lucide-react';

export const DeleteColumnButton = ({ column, columns, setColumns }: any) => {
  const [selectedColumnForDelete, setSelectedColumnForDelete] =
    useState<Column | null>(null);

  // Delete column
  const deleteColumn = async (columnId: string) => {
    try {
      await axios.delete(`http://localhost:5000/columns/${columnId}`);
      setColumns(columns.filter((col: any) => col.id !== columnId));
      setSelectedColumnForDelete(null);
    } catch (error) {
      console.error('Error deleting column:', error);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-red-400 hover:text-red-600 hover:bg-gray-700"
          onClick={() => setSelectedColumnForDelete(column)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-gray-800 text-gray-100">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this column?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div className="flex justify-end gap-2 mt-4">
          <Button
            variant="ghost"
            onClick={() => setSelectedColumnForDelete(null)}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() =>
              selectedColumnForDelete &&
              deleteColumn(selectedColumnForDelete.id)
            }
          >
            Delete
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
