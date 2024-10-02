import { IBoard } from '../../../types/types';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Button } from '../../ui/button';
interface BoardHeaderProps {
  activeBoard: IBoard;
}
export const BoardHeader = ({ activeBoard }: BoardHeaderProps) => {
  return (
    <div className="flex justify-between items-center px-4 py-8 border-b">
      <h2 className="text-2xl font-semibold">{activeBoard.board_title}</h2>
      <div className="flex items-center space-x-4">
        <div className=" flex space-x-[-5px]">
          <Avatar className="w-8 h-8 bg-indigo-100 flex space-x-[-10px]">
            <AvatarImage src="/placeholder-user.jpg" alt="User" />
            <AvatarFallback>U1</AvatarFallback>
          </Avatar>
          <Avatar className="w-8 h-8 bg-red-100">
            <AvatarImage src="/placeholder-user.jpg" alt="User" />
            <AvatarFallback>U2</AvatarFallback>
          </Avatar>
        </div>
        <Button size="sm" variant="outline" className=" bg-blue-500 text-white">
          + Add Member
        </Button>
      </div>
    </div>
  );
};
