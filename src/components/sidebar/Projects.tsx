import { ScrollArea } from '../ui/scroll-area';
import { Card } from '../ui/card';
import { Board } from '../../pages/dashboard/Dashboard';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';

interface ProjectsProps {
  activeBoard: Board | null;
  setActiveBoard: (board: Board) => void;
}

export const Projects = ({ activeBoard, setActiveBoard }: ProjectsProps) => {
  const fetchBoards = async (): Promise<Board[]> => {
    const response = await axios.get('http://localhost:5000/boards');
    return response.data;
  };

  const {
    data: boards,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['boards'],
    queryFn: fetchBoards,
  });

  if (isLoading) return <p>Loading boards...</p>;
  if (isError) return <p>Something went wrong.</p>;

  return (
    <ScrollArea className="h-[200px] border-b">
      {boards?.map((board) => (
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          key={board.id}
        >
          <Card
            className={`w-full flex items-center justify-start mb-2 h-12 px-4 transition-colors cursor-pointer rounded-md shadow-sm border ${
              activeBoard?.id === board.id
                ? 'bg-blue-600 text-white border-blue-500'
                : 'bg-white hover:bg-gray-100 border-gray-200'
            }`}
            onClick={() => setActiveBoard(board)}
          >
            <div className="flex items-center gap-x-3">
              <div
                className={`w-8 h-8 flex justify-center items-center text-sm font-medium rounded-md ${
                  activeBoard?.id === board.id
                    ? 'bg-white text-blue-600'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {[...board.board_title].splice(0, 2).join('').toUpperCase()}
              </div>
              <p className="font-medium">{board.board_title}</p>
            </div>
          </Card>
        </motion.div>
      ))}
    </ScrollArea>
  );
};
