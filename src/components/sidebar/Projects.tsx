import { ScrollArea } from '../ui/scroll-area';
import { Card } from '../ui/card';
import { Board } from '../../pages/dashboard/Dashboard';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

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
  return (
    <ScrollArea className="h-[200px]">
      {boards?.map((board) => (
        <Card
          key={board.id}
          className={`w-full justify-start mb-1 ${
            activeBoard === board ? 'bg-gray-100' : ''
          }`}
          onClick={() => setActiveBoard(board)}
        >
          <div className="w-3 h-3 rounded-sm mr-2" />
          {board.board_title}
        </Card>
      ))}
    </ScrollArea>
  );
};
