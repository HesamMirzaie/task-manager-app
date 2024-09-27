import { CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Edit, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { useState } from 'react';
import { Column } from '../../pages/dashboard/board page/KanbanBoard';
import axios from 'axios';

export const ColumnHeader = ({ column, columns, setColumns }: any) => {
  const [editingColumn, setEditingColumn] = useState<Column | null>(null);
  const [selectedColumnForDelete, setSelectedColumnForDelete] =
    useState<Column | null>(null);

  // Edit column title
  const editColumnTitle = async () => {
    if (editingColumn && editingColumn.title.trim()) {
      try {
        const response = await axios.put<Column>(
          `http://localhost:5000/columns/${editingColumn.id}`,
          editingColumn
        );

        const updatedColumns = columns.map((col: any) =>
          col.id === editingColumn.id ? response.data : col
        );
        setColumns(updatedColumns);
        setEditingColumn(null);
      } catch (error) {
        console.error('Error updating column:', error);
      }
    }
  };

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
    <>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold text-gray-100">
          {column.title}
        </CardTitle>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-gray-100 hover:bg-gray-700"
            onClick={() => setEditingColumn(column)}
          >
            <Edit className="h-4 w-4" />
          </Button>
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
        </div>
      </CardHeader>
      {/* Edit Column Dialog */}
      <Dialog
        open={!!editingColumn}
        onOpenChange={() => setEditingColumn(null)}
      >
        <DialogContent className="bg-gray-900 text-gray-100">
          <DialogHeader>
            <DialogTitle>Edit Column</DialogTitle>
          </DialogHeader>
          {editingColumn && (
            <div className="mt-4">
              <Input
                value={editingColumn.title}
                onChange={(e) =>
                  setEditingColumn({
                    ...editingColumn,
                    title: e.target.value,
                  })
                }
                placeholder="Column Title"
                className="mb-4"
              />
              <Button variant="default" onClick={editColumnTitle}>
                Save Changes
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
