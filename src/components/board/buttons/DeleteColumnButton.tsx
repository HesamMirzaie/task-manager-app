import { useState } from 'react';
import { Column } from '../../../pages/dashboard/board page/KanbanBoard';
import axios from 'axios';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../../ui/alert-dialog';
import { Button } from '../../ui/button';
import { Trash2 } from 'lucide-react';

export const DeleteColumnButton = ({ column, columns, setColumns }: any) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Delete column
  const deleteColumn = async (columnId: string) => {
    setIsDeleting(true);
    setError(null);
    try {
      await axios.delete(`http://localhost:5000/columns/${columnId}`);
      setColumns(columns.filter((col: Column) => col.id !== columnId));
    } catch (error) {
      console.error('Error deleting column:', error);
      setError('Failed to delete column. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:text-red-400  transition-colors duration-200"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-gray-900 text-white border border-gray-700 rounded-lg shadow-2xl max-w-md mx-auto">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-bold text-red-400">
            Delete Column
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-400 mt-2">
            Are you sure you want to delete the column "{column.title}"? This
            action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {error && (
          <div className="mt-4 p-2 bg-red-900/20 border border-red-500 rounded text-red-400">
            {error}
          </div>
        )}
        <AlertDialogFooter className="mt-6 space-x-4">
          <AlertDialogCancel asChild>
            <Button
              variant="outline"
              className="bg-transparent text-gray-300 border-gray-600 hover:bg-gray-800 hover:text-white transition-colors duration-200"
            >
              Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              onClick={() => deleteColumn(column.id)}
              disabled={isDeleting}
              className="bg-red-600 text-white hover:bg-red-700 transition-colors duration-200 rounded-full px-6 py-2 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
