import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Plus, MoreHorizontal } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@radix-ui/react-dialog';
import { DialogHeader } from '../../../components/ui/dialog';
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
  tasks: Task[];
}

export default function TrelloKanban() {
  const [columns, setColumns] = useState<Column[]>([]);
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [selectedColumn, setSelectedColumn] = useState('');
  const { boardId } = useParams<{ boardId: string }>();

  useEffect(() => {
    const fetchColumns = async () => {
      try {
        const response = await axios.get<Column[]>(
          `http://localhost:3000/boards/${boardId}/columns`
        );
        setColumns(response.data);
      } catch (error) {
        console.error('Error fetching columns:', error);
      }
    };
    fetchColumns();
  }, []);

  const addColumn = async () => {
    if (newColumnTitle.trim()) {
      const newColumn: Column = {
        id: Date.now().toString(),
        title: newColumnTitle,
        tasks: [],
      };

      try {
        const response = await axios.post<Column>(
          `http://localhost:3000/boards/${boardId}/columns`,
          newColumn
        );
        setColumns([...columns, response.data]);
        setNewColumnTitle('');
      } catch (error) {
        console.error('Error adding column:', error);
      }
    }
  };

  const addTask = async () => {
    if (selectedColumn && newTaskTitle.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        title: newTaskTitle,
        description: newTaskDescription,
      };

      const targetColumn = columns.find((col) => col.id === selectedColumn);

      if (targetColumn) {
        const updatedTasks = [...targetColumn.tasks, newTask];

        try {
          const response = await axios.patch<Column>(
            `http://localhost:3000/boards/${boardId}/columns/${targetColumn.id}`,
            {
              tasks: updatedTasks,
            }
          );

          setColumns(
            columns.map((col) =>
              col.id === response.data.id ? response.data : col
            )
          );
          setNewTaskTitle('');
          setNewTaskDescription('');
          setSelectedColumn('');
        } catch (error) {
          console.error('Error adding task:', error);
        }
      }
    }
  };

  return (
    <div className="p-4 bg-gray-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-4 text-gray-100">
        Trello-like Kanban Board
      </h1>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((column) => (
          <Card
            key={column.id}
            className="w-[300px] bg-gray-800 flex-shrink-0 border-gray-700"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-100">
                {column.title}
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-gray-100"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                {column.tasks.map((task) => (
                  <Card
                    key={task.id}
                    className="mb-2 cursor-pointer bg-gray-700 hover:bg-gray-600"
                  >
                    <CardContent className="p-2">
                      <h3 className="font-medium text-gray-100">
                        {task.title}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {task.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </ScrollArea>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-400 hover:text-gray-100 hover:bg-gray-700"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add a card
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-800 text-gray-100">
                  <DialogHeader>
                    <DialogTitle>Add a new task</DialogTitle>
                  </DialogHeader>
                  <Input
                    placeholder="Task Title"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    className="mb-2 bg-gray-700 text-gray-100 border-gray-600"
                  />
                  <Textarea
                    placeholder="Task Description"
                    value={newTaskDescription}
                    onChange={(e) => setNewTaskDescription(e.target.value)}
                    className="mb-2 bg-gray-700 text-gray-100 border-gray-600"
                  />
                  <Button
                    onClick={() => {
                      setSelectedColumn(column.id);
                      addTask();
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Add Task
                  </Button>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
        <Card className="w-[300px] bg-gray-800 flex-shrink-0 border-gray-700">
          <CardContent>
            <Input
              placeholder="New Column Title"
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              className="mb-2 bg-gray-700 text-gray-100 border-gray-600"
            />
            <Button
              onClick={addColumn}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Add Column
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
