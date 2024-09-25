'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Plus, Trash2, Edit } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../../../components/ui/alert-dialog'; // Use correct AlertDialog components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../components/ui/dialog';
import { ScrollArea } from '../../../components/ui/scroll-area';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';

interface Task {
  id: string;
  title: string;
  description: string;
}

interface Column {
  id: string;
  title: string;
  boardId: string | undefined;
  tasks?: Task[];
}

export default function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([]);
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [selectedColumn, setSelectedColumn] = useState<string | null>(null);
  const [editingColumn, setEditingColumn] = useState<Column | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [selectedColumnForDelete, setSelectedColumnForDelete] =
    useState<Column | null>(null);
  const [selectedTaskForDelete, setSelectedTaskForDelete] =
    useState<Task | null>(null);
  const { boardId } = useParams<{ boardId: string }>();

  // Fetch tasks for a specific column
  const fetchTasks = async (columnId: string) => {
    try {
      const response = await axios.get<Task[]>(
        `http://localhost:5000/tasks?columnId=${columnId}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return [];
    }
  };

  // Fetch columns and their tasks
  useEffect(() => {
    const fetchColumnsAndTasks = async () => {
      try {
        const response = await axios.get<Column[]>(
          `http://localhost:5000/columns`
        );
        const filteredColumns = response.data.filter(
          (column) => column.boardId === boardId
        );

        const columnsWithTasks = await Promise.all(
          filteredColumns.map(async (col) => {
            const tasks = await fetchTasks(col.id);
            return { ...col, tasks };
          })
        );

        setColumns(columnsWithTasks);
      } catch (error) {
        console.error('Error fetching columns or tasks:', error);
      }
    };

    fetchColumnsAndTasks();
  }, [boardId]);

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

  // Add new task to a column
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

        const updatedColumns = columns.map((col) => {
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

  // Edit column title
  const editColumnTitle = async () => {
    if (editingColumn && editingColumn.title.trim()) {
      try {
        const response = await axios.put<Column>(
          `http://localhost:5000/columns/${editingColumn.id}`,
          editingColumn
        );

        const updatedColumns = columns.map((col) =>
          col.id === editingColumn.id ? response.data : col
        );
        setColumns(updatedColumns);
        setEditingColumn(null);
      } catch (error) {
        console.error('Error updating column:', error);
      }
    }
  };

  // Edit task
  const editTask = async () => {
    if (editingTask && editingTask.title.trim()) {
      try {
        const response = await axios.put<Task>(
          `http://localhost:5000/tasks/${editingTask.id}`,
          editingTask
        );

        const updatedColumns = columns.map((col) => {
          if (col.tasks?.find((task) => task.id === editingTask.id)) {
            return {
              ...col,
              tasks: col.tasks?.map((task) =>
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

  // Delete column
  const deleteColumn = async (columnId: string) => {
    try {
      await axios.delete(`http://localhost:5000/columns/${columnId}`);
      setColumns(columns.filter((col) => col.id !== columnId));
      setSelectedColumnForDelete(null);
    } catch (error) {
      console.error('Error deleting column:', error);
    }
  };

  // Delete task
  const deleteTask = async (taskId: string) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${taskId}`);
      const updatedColumns = columns.map((col) => ({
        ...col,
        tasks: col.tasks?.filter((task) => task.id !== taskId),
      }));
      setColumns(updatedColumns);
      setSelectedTaskForDelete(null);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-100">
        Modern Dark Kanban Board
      </h1>

      <div className="flex gap-6 overflow-x-auto pb-6">
        {columns.map((column) => (
          <Card
            key={column.id}
            className="w-80 bg-gray-800 border-gray-700 shadow-lg"
          >
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
            <CardContent className="pt-4">
              <ScrollArea className="h-64">
                {column.tasks && column.tasks.length > 0 ? (
                  column.tasks.map((task) => (
                    <div
                      key={task.id}
                      className="mb-4 p-3 bg-gray-700 rounded-lg"
                    >
                      <h3 className="text-sm font-medium text-gray-100">
                        {task.title}
                      </h3>
                      <p className="text-xs text-gray-400 mt-1">
                        {task.description}
                      </p>
                      <div className="flex justify-end mt-2 gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-gray-400 hover:text-gray-100 hover:bg-gray-600"
                          onClick={() => setEditingTask(task)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
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
            </CardContent>
          </Card>
        ))}

        {/* Add new column */}
        <div className="w-80 bg-gray-800 border-gray-700 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-100 mb-4">
            Add New Column
          </h2>
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
      </div>

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
    </div>
  );
}
