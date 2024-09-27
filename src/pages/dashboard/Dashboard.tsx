import { useEffect, useState } from 'react';
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
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBoards = async (): Promise<void> => {
      try {
        const response = await axios.get<Board[]>(
          'http://localhost:5000/boards'
        );
        setBoards(response.data);
      } catch (err) {
        console.error('Error fetching boards:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBoards();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full p-4 bg-gray-900 text-white min-h-screen">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Kanban Boards</h1>
        <CreateBoardButton setBoards={setBoards} />
      </header>

      {boards.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {boards.map((board) => (
            <BoardCard board={board} setBoards={setBoards} />
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
