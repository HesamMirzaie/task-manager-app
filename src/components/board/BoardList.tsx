import { motion } from 'framer-motion';
import { SortableBoard } from './SortableBoard';

interface BoardListProps {
  boards: any[];
  editBoard: (id: string, newName: string) => void;
  deleteBoard: (id: string) => void;
}

const BoardList: React.FC<BoardListProps> = ({
  boards,
  editBoard,
  deleteBoard,
}) => {
  return (
    <motion.div
      className="flex gap-6 overflow-x-auto overflow-y-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {boards?.map((board) => (
        <SortableBoard
          key={board.id}
          board={board}
          editBoard={editBoard}
          deleteBoard={deleteBoard}
        />
      ))}
    </motion.div>
  );
};

export default BoardList;
