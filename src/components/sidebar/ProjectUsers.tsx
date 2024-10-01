import { Card } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { motion } from 'framer-motion';

interface ProjectUsersProps {
  activeBoard: {
    board_users: string[];
  } | null;
}

export const ProjectUsers = ({ activeBoard }: ProjectUsersProps) => {
  if (!activeBoard) return <p>No board selected.</p>;

  if (activeBoard.board_users.length === 0) {
    return <p>No users in this board.</p>;
  }

  return (
    <ScrollArea className="h-[200px]">
      <>
        {activeBoard.board_users.map((user, index) => (
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            key={index}
          >
            <Card className="w-full flex items-center mb-2 h-12 px-4 transition-colors cursor-pointer rounded-md shadow-sm border hover:bg-gray-100">
              <div className="flex items-center gap-x-3">
                <div className="w-8 h-8 flex justify-center items-center text-sm font-medium bg-gray-200 text-gray-700 rounded-full">
                  {user[0].toUpperCase()}
                </div>
                <p className="font-medium">{user}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </>
    </ScrollArea>
  );
};
