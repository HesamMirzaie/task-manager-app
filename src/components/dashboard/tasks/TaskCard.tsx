import { ITask } from '../../../types/types';
import { Avatar, AvatarFallback } from '../../ui/avatar';
import { Badge } from '../../ui/badge';
import { TaskDropDown } from './buttons/TaskDropDown';
interface TaskCardProps {
  task: ITask;
}
export const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <div
      key={task.id}
      className=" border  bg-white  px-4 py-2 h-[200px] max-h-[200px]  flex flex-col justify-between text-left rounded-xl cursor-grab"
    >
      <div className=" flex items-center justify-between mb-2">
        <Badge className=" bg-orange-200 text-orange-700">Design</Badge>
        <TaskDropDown taskId={task.id} />
      </div>
      <div className=" flex-1 p-2">
        <p className=" font-bold text-slate-800">{task.title}</p>
        <p className=" text-slate-500 font-thin">{task.description}</p>
      </div>
      <div className=" border-t p-2 flex justify-end space-x-[-10px]">
        <Avatar className=" bg-orange-400">
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar className=" bg-green-400">
          <AvatarFallback>FN</AvatarFallback>
        </Avatar>
        <Avatar className=" bg-indigo-400">
          <AvatarFallback>GH</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};
