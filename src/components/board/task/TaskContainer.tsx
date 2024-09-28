import { ScrollArea } from '../../ui/scroll-area';

import { TaskCard } from './TaskCard';

export const TaskContainer = ({ tasks }) => {
  return (
    <>
      <ScrollArea className="h-64">
        {tasks.length > 0 ? (
          tasks.map((task: any) => <TaskCard key={task.id} task={task} />)
        ) : (
          <p className="text-sm text-gray-400">No tasks available.</p>
        )}
      </ScrollArea>
    </>
  );
};
