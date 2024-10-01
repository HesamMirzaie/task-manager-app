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
  const {
    data: tasks,
    isLoading,
    isError,
  } = useQuery({
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
        ) : isError ? (
          <p className="text-red-500">Error fetching tasks.</p>
        ) : tasks && tasks.length > 0 ? (
          <TaskContainer tasks={tasks} />
        ) : (
          <p className="text-gray-400">No tasks available.</p>
        )}

        {/* Add new Task */}
        {/* <AddTaskButton column={column} /> */}
      </CardContent>
    </Card>
  );
};
