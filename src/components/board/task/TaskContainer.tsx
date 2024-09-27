import { Edit, Trash2 } from 'lucide-react';
import { Button } from '../../ui/button';
import { ScrollArea } from '../../ui/scroll-area';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../../ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { useState } from 'react';
import { Task } from '../../../pages/dashboard/board page/KanbanBoard';
import axios from 'axios';

export const TaskContainer = ({ column, columns, setColumns }: any) => {
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const [selectedTaskForDelete, setSelectedTaskForDelete] =
    useState<Task | null>(null);
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

  // Delete task
  const deleteTask = async (taskId: string) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${taskId}`);
      const updatedColumns = columns.map((col: any) => ({
        ...col,
        tasks: col.tasks?.filter((task: any) => task.id !== taskId),
      }));
      setColumns(updatedColumns);
      setSelectedTaskForDelete(null);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  return (
    <>
      <ScrollArea className="h-64">
        {column.tasks && column.tasks.length > 0 ? (
          column.tasks.map((task: any) => (
            // Render Tasks
            <div key={task.id} className="mb-4 p-3 bg-gray-700 rounded-xl">
              <h3 className="text-sm font-medium text-gray-100">
                {task.title}
              </h3>
              <p className="text-xs text-gray-400 mt-1">{task.description}</p>
              {/* Buttons */}
              <div className="flex justify-end mt-2 gap-2">
                {/* Edit button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-gray-100 hover:bg-gray-600"
                  onClick={() => setEditingTask(task)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                {/* Delete Button */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-400 hover:text-red-600 hover:bg-gray-600"
                      onClick={() => setSelectedTaskForDelete(task)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-gray-800 text-gray-100">
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure you want to delete this task?
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <div className="flex justify-end gap-2 mt-4">
                      <Button
                        variant="ghost"
                        onClick={() => setSelectedTaskForDelete(null)}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() =>
                          selectedTaskForDelete &&
                          deleteTask(selectedTaskForDelete.id)
                        }
                      >
                        Delete
                      </Button>
                    </div>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-400">No tasks available.</p>
        )}
      </ScrollArea>
      {/* Edit Task Dialog */}
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
