import { ITask } from '../../../types/types';
import { Badge } from '../../ui/badge';
import { TaskDropDown } from './buttons/TaskDropDown';

export const TaskCard = ({ task }: { task: ITask }) => {
  return (
    <div
      key={task.id}
      className=" border  bg-white  px-4 py-2 h-[200px] max-h-[200px]  flex flex-col justify-between text-left rounded-xl cursor-grab"
    >
      <div className=" flex items-center justify-between mb-2">
        <Badge>Design</Badge>
        <TaskDropDown taskId={task.id} />
      </div>
      <div className=" flex-1 p-2">
        <p className=" font-bold text-slate-800">{task.title}</p>
        <p className=" text-slate-500 font-thin">{task.description}</p>
      </div>
      <div className=" border-t p-2">Users</div>
    </div>
  );
};
