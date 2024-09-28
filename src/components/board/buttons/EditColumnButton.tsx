import { Button } from '../../ui/button';
import { Edit } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog';
import { Input } from '../../ui/input';
import { useState } from 'react';
import { Column } from '../../../pages/dashboard/board page/KanbanBoard';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const EditColumnButton = ({ column }: { column: Column }) => {
  const [editingColumn, setEditingColumn] = useState<Column | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  // Mutation to edit the column title
  const editColumnMutation = useMutation(
    async (updatedColumn: Column) => {
      const response = await axios.put<Column>(
        `http://localhost:5000/columns/${updatedColumn.id}`,
        updatedColumn
      );
      return response.data;
    },
    {
      onSuccess: (data) => {
        // Update the cache with the new column data
        queryClient.setQueryData(
          ['columns', column.boardId],
          (oldColumns: Column[] | undefined) => {
            return oldColumns
              ? oldColumns.map((col) => (col.id === data.id ? data : col))
              : [];
          }
        );
        setEditingColumn(null);
      },
      onError: (error) => {
        console.error('Error updating column:', error);
      },
      onSettled: () => {
        setIsLoading(false);
      },
    }
  );

  const handleEditClick = () => {
    setEditingColumn(column);
  };

  const handleSaveChanges = () => {
    if (editingColumn && editingColumn.title.trim()) {
      setIsLoading(true);
      editColumnMutation.mutate(editingColumn);
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
      <Dialog
        open={!!editingColumn}
        onOpenChange={() => setEditingColumn(null)}
      >
        <DialogContent className="bg-gray-900 text-white border border-gray-700 rounded-lg shadow-2xl max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-indigo-400">
              Edit Column
            </DialogTitle>
            <DialogDescription className="text-gray-400 mt-2">
              Change the title of your column.
            </DialogDescription>
          </DialogHeader>
          {editingColumn && (
            <div className="mt-6 space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="columnTitle"
                  className="text-sm font-medium text-gray-300"
                >
                  Column Title
                </label>
                <Input
                  id="columnTitle"
                  value={editingColumn.title}
                  onChange={(e) =>
                    setEditingColumn({
                      ...editingColumn,
                      title: e.target.value,
                    })
                  }
                  placeholder="Enter column title"
                  className="bg-gray-800 text-white border-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 rounded-md transition-all duration-200"
                />
              </div>
            </div>
          )}
          <DialogFooter className="mt-6">
            <Button
              onClick={handleSaveChanges}
              disabled={isLoading || !editingColumn}
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
