import { Card, CardContent } from '../ui/card';
import { ColumnHeader } from './ColumnHeader';
import { TaskContainer } from './task/TaskContainer';
import { AddTaskButton } from './buttons/AddTaskButton';
import { Task } from '../../pages/dashboard/board page/KanbanBoard';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchTasks = async (columnId: string) => {
  const response = await axios.get<Task[]>(
    `http://localhost:5000/tasks?columnId=${columnId}`
  );
  return response.data;
};

export const ColumnCard = ({ column }: any) => {
  const { data: tasks, isLoading } = useQuery({
    queryKey: ['tasks', column.id],
    queryFn: () => fetchTasks(column.id),
  });

  return (
    <Card
      key={column.id}
      className="w-80 bg-gray-800 border-gray-700 shadow-lg"
    >
      <ColumnHeader column={column} />

      <CardContent className="pt-4">
        {isLoading ? (
          <p className="text-gray-400">Loading tasks...</p>
        ) : (
          tasks && <TaskContainer tasks={tasks} />
        )}

        {/* Add new Task */}
        <AddTaskButton column={column} />
      </CardContent>
    </Card>
  );
};
