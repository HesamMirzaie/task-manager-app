import { useState } from 'react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Task } from '../../pages/dashboard/board page/KanbanBoard';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
export const AddTaskButton = ({ column, columns, setColumns }: any) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [selectedColumn, setSelectedColumn] = useState<string | null>(null);

  const addTask = async () => {
    if (newTaskTitle.trim() && selectedColumn) {
      const newTask: Task = {
        id: uuidv4(),
        title: newTaskTitle,
        description: newTaskDescription,
      };

      try {
        const response = await axios.post<Task>(`http://localhost:5000/tasks`, {
          ...newTask,
          columnId: selectedColumn,
        });

        const updatedColumns = columns.map((col: any) => {
          if (col.id === selectedColumn) {
            return {
              ...col,
              tasks: [...(col.tasks || []), response.data],
            };
          }
          return col;
        });

        setColumns(updatedColumns);
        setNewTaskTitle('');
        setNewTaskDescription('');
        setSelectedColumn(null);
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="text-gray-100 border-gray-600 hover:bg-gray-700 hover:text-gray-100 hover:border-gray-500 mt-4 w-full"
          onClick={() => setSelectedColumn(column.id)}
        >
          Add Task
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-900 text-gray-100">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <Input
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Task Title"
            className="mb-4"
          />
          <Textarea
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            placeholder="Task Description"
            className="mb-4"
          />
          <Button variant="default" onClick={addTask}>
            Add Task
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
