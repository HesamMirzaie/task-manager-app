import { Card } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

export const ProjectUsers = ({ activeBoard }) => {
  if (!activeBoard) return;
  return (
    <ScrollArea className="h-[200px]">
      <>
        {activeBoard &&
          activeBoard.board_users.map((user) => <Card>{user}</Card>)}
      </>
    </ScrollArea>
  );
};
