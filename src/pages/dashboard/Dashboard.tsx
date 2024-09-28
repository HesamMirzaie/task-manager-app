import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Loading } from '../../components/Loading';
import { CreateBoardButton } from '../../components/dashboard/buttons/CreateBoardButton';
import { BoardCard } from '../../components/dashboard/BoardCard';

export interface Board {
  id: string;
  board_title: string;
  board_description: string;
  board_users: string[];
}

export default function KanbanDashboard() {
  const fetchBoards = async (): Promise<Board[]> => {
    const response = await axios.get<Board[]>('http://localhost:5000/boards');
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
    <div className="w-full p-6 bg-gray-900 text-white min-h-screen">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Kanban Boards</h1>
        <CreateBoardButton />
      </header>

      {boards.length > 0 ? (
        <div className="flex overflow-x-auto overflow-y-hidden space-x-4 pb-4">
          {boards?.map((board) => (
            <div className="flex-shrink-0" key={board.id}>
              <BoardCard board={board} />
            </div>
          ))}
        </div>
      ) : (
        <EmptyBoard />
      )}
    </div>
  );
}

function EmptyBoard() {
  return (
    <div className="text-center py-8">
      <p className="text-xl text-gray-400">
        No boards available. Create your first board to get started!
      </p>
    </div>
  );
}
