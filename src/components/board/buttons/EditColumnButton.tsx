import { Button } from '../../ui/button';
import { Edit } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog';
import { Input } from '../../ui/input';
import { useState } from 'react';
import { Column } from '../../../pages/dashboard/board page/KanbanBoard';
import axios from 'axios';

export const EditColumnButton = ({ column, columns, setColumns }: any) => {
  const [editingColumn, setEditingColumn] = useState<Column | null>(null);

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
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="text-gray-400 hover:text-gray-100 hover:bg-gray-700"
        onClick={() => setEditingColumn(column)}
      >
        <Edit className="h-4 w-4" />
      </Button>
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
