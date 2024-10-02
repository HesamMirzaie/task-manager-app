import { ScrollArea } from '../../ui/scroll-area';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { ProjectCard } from './ProjectCard';
import { IBoard } from '../../../types/types';

interface ProjectsProps {
  activeBoard: IBoard | null;
  setActiveBoard: (board: IBoard) => void;
}

export const Projects = ({ activeBoard, setActiveBoard }: ProjectsProps) => {
  const fetchBoards = async (): Promise<IBoard[]> => {
    const response = await axios.get('http://localhost:5000/boards');
    return response.data;
  };

  const {
    data: boards,
    isLoading,
    isError,
  } = useQuery<IBoard[]>({
    queryKey: ['boards'],
    queryFn: fetchBoards,
  });

  if (isLoading) return <p>Loading boards...</p>;
  if (isError) return <p>Something went wrong.</p>;

  return (
    <ScrollArea className="max-h-[200px]">
      {boards?.map((board) => (
        <div key={board.id}>
          <ProjectCard
            board={board}
            activeBoard={activeBoard}
            setActiveBoard={setActiveBoard}
          />
        </div>
      ))}
    </ScrollArea>
  );
};
