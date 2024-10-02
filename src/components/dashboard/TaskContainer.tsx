import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { CreateTaskColumn } from './CreateTaskColumn';
import { TaskCard } from './TaskCard';

export const TaskContainer = ({ columnId }: { columnId: string }) => {
  // فچ کردن همه تسک‌ها از سرور
  const {
    data: tasks = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:5000/tasks');
      return response.data;
    },
  });

  // فیلتر کردن تسک‌هایی که مربوط به ستون خاص هستند
  const filteredTasks = tasks.filter((task: any) => task.columnId === columnId);

  if (isLoading) {
    return <div>Loading tasks...</div>;
  }

  if (isError) {
    return <div>Error fetching tasks.</div>;
  }

  return (
    <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
      <CreateTaskColumn columnId={columnId} />

      {filteredTasks.length > 0 ? (
        filteredTasks.map((task: any) => <TaskCard key={task.id} task={task} />)
      ) : (
        <div>No tasks for this column</div>
      )}
    </div>
  );
};
