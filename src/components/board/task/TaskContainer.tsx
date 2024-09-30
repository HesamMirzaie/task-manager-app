import { ScrollArea } from '../../ui/scroll-area';

import { TaskCard } from './TaskCard';

export const TaskContainer = ({ tasks }) => {
  return (
    <>
      <ScrollArea className="flex-1">
        {tasks.length > 0 &&
          tasks.map((task: any) => <TaskCard key={task.id} task={task} />)}
      </ScrollArea>
    </>
  );
};
