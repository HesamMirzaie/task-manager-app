import { ScrollArea } from '../../ui/scroll-area';

import { TaskCard } from './TaskCard';

export const TaskContainer = ({ column, columns, setColumns }: any) => {
  return (
    <>
      <ScrollArea className="h-64">
        {column.tasks && column.tasks.length > 0 ? (
          column.tasks.map((task: any) => (
            <TaskCard
              key={task.id}
              columns={columns}
              setColumns={setColumns}
              task={task}
            />
          ))
        ) : (
          <p className="text-sm text-gray-400">No tasks available.</p>
        )}
      </ScrollArea>
    </>
  );
};
