import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ColumnCard } from '../../../components/board/ColumnCard';
import { BoardPageHeader } from '../../../components/board/BoardPageHeader';

export interface Task {
  id: string;
  title: string;
  description: string;
  columnId: string;
}

export interface Column {
  id: string;
  title: string;
  boardId: string | undefined;
  tasks?: Task[];
}

const fetchColumns = async (boardId: string) => {
  const response = await axios.get<Column[]>(`http://localhost:5000/columns`);
  return response.data.filter((column) => column.boardId === boardId);
};

export default function KanbanBoard() {
  const { boardId } = useParams<{ boardId: string }>();

  // Fetch columns for the specific board
  const {
    data: columns,
    isLoading: loadingColumns,
    isError: errorColumns,
  } = useQuery({
    queryKey: ['columns', boardId],
    queryFn: () => fetchColumns(boardId!),
  });

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-gray-100">
      <BoardPageHeader columns={columns || []} boardId={boardId} />
      {/* if data in loading */}
      {loadingColumns ? (
        <p>Loading columns...</p>
      ) : // If there is and error
      errorColumns ? (
        <p className="text-red-500">Error fetching columns.</p>
      ) : // when data fetched
      columns.length > 0 ? (
        <div className="flex gap-6 overflow-x-auto pb-6">
          {columns.map((column) => (
            <ColumnCard key={column.id} column={column} />
          ))}
        </div>
      ) : (
        <EmptyColumn />
      )}
    </div>
  );
}

function EmptyColumn() {
  return (
    <div className="text-center py-8">
      <p className="text-xl text-gray-400">
        No Column available. Create your first Column to get started!
      </p>
    </div>
  );
}
