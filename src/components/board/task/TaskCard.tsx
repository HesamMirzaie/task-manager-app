import { EditTaskButton } from './buttons/EditTaskButton';
import { DeleteTaskButton } from './buttons/DeleteTaskButton';

export const TaskCard = ({ task, columns, setColumns }: any) => {
  return (
    <>
      <div className="mb-4 p-3 bg-gray-700 rounded-xl">
        <header>
          <h3 className="text-sm font-medium text-gray-100">{task.title}</h3>
          <p className="text-xs text-gray-400 mt-1">{task.description}</p>
        </header>

        <div className="flex justify-end mt-2 gap-2">
          <EditTaskButton
            task={task}
            columns={columns}
            setColumns={setColumns}
          />
          <DeleteTaskButton
            task={task}
            columns={columns}
            setColumns={setColumns}
          />
        </div>
      </div>
    </>
  );
};
