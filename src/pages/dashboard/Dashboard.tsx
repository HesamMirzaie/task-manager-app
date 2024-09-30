import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Loading } from '../../components/Loading';
import { CreateBoardButton } from '../../components/dashboard/buttons/CreateBoardButton';
import { BoardCard } from '../../components/dashboard/BoardCard';
import { Navbar } from '../../components/Navbar';

export interface Board {
  id: string;
  board_title: string;
  board_description: string;
  board_users: string[];
}

export default function KanbanDashboard() {
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

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <p className="text-red-500">Error fetching boards.</p>;
  }

  return (
    <div className=" h-full p-6">
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">Kanban Boards</h1>
        <CreateBoardButton />
      </header>

      {boards && boards.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {boards?.map((board) => (
            <BoardCard key={board.id} board={board} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-xl text-gray-400">
            No boards available. Create your first board to get started!
          </p>
        </div>
      )}
    </div>
  );
}
