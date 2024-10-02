import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { CreateTaskColumn } from './buttons/CreateTaskColumn';
import { TaskCard } from './TaskCard';
import { ITask } from '../../../types/types';

export const TaskContainer = ({ columnId }: { columnId: string }) => {
  const { data: tasks = [] } = useQuery<ITask[]>({
    queryKey: ['tasks'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:5000/tasks');
      return response.data;
    },
  });
  const filteredTasks = tasks.filter(
    (task: ITask) => task.columnId === columnId
  );

  return (
    <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
      <CreateTaskColumn columnId={columnId} />

      {filteredTasks.map((task: any) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};
