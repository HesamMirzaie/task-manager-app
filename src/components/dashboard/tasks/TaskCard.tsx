import { ColumnDropDown } from '../columns/buttons/ColumnDropDown';
import { TaskDropDown } from './buttons/TaskDropDown';

export const TaskCard = ({ task }: any) => {
  return (
    <div
      key={task.id}
      className=" relative bg-white p-2.5 h-[100px] max-h-[100px] items-center flex text-left rounded-xl cursor-grab"
    >
      {task.title}
      <TaskDropDown taskId={task.id} />
    </div>
  );
};
