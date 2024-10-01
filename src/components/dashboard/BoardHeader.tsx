import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../components/ui/avatar';
import { Button } from '../ui/button';

export const BoardHeader = ({ activeBoard }) => {
  return (
    <div className="flex justify-between items-center mb-6 p-4">
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
