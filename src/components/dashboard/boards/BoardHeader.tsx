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
      <div className="flex items-center space-x-2">
        <Avatar className="w-8 h-8">
          <AvatarImage src="/placeholder-user.jpg" alt="User" />
          <AvatarFallback>U1</AvatarFallback>
        </Avatar>
        <Button size="sm" variant="outline">
          + Add Member
        </Button>
      </div>
    </div>
  );
};
