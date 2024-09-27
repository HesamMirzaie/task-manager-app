import { Edit } from 'lucide-react';
import { Button } from '../../../ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../../ui/dialog';
import { Input } from '../../../ui/input';
import { Textarea } from '../../../ui/textarea';
import { useState } from 'react';
import { Task } from '../../../../pages/dashboard/board page/KanbanBoard';
import axios from 'axios';

export const EditTaskButton = ({ task, columns, setColumns }: any) => {
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Edit task
  const editTask = async () => {
    if (editingTask && editingTask.title.trim()) {
      try {
        const response = await axios.put<Task>(
          `http://localhost:5000/tasks/${editingTask.id}`,
          editingTask
        );

        const updatedColumns = columns.map((col: any) => {
          if (col.tasks?.find((task: any) => task.id === editingTask.id)) {
            return {
              ...col,
              tasks: col.tasks?.map((task: any) =>
                task.id === editingTask.id ? response.data : task
              ),
            };
          }
          return col;
        });

        setColumns(updatedColumns);
        setEditingTask(null);
      } catch (error) {
        console.error('Error updating task:', error);
      }
    }
  };
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="text-gray-400 hover:text-gray-100 hover:bg-gray-600"
        onClick={() => setEditingTask(task)}
      >
        <Edit className="h-4 w-4" />
      </Button>
      <Dialog open={!!editingTask} onOpenChange={() => setEditingTask(null)}>
        <DialogContent className="bg-gray-900 text-gray-100">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          {editingTask && (
            <div className="mt-4">
              <Input
                value={editingTask.title}
                onChange={(e) =>
                  setEditingTask({
                    ...editingTask,
                    title: e.target.value,
                  })
                }
                placeholder="Task Title"
                className="mb-4"
              />
              <Textarea
                value={editingTask.description}
                onChange={(e) =>
                  setEditingTask({
                    ...editingTask,
                    description: e.target.value,
                  })
                }
                placeholder="Task Description"
                className="mb-4"
              />
              <Button variant="default" onClick={editTask}>
                Save Changes
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
