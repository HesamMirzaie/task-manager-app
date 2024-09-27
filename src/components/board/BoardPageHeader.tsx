import { ArrowLeft } from 'lucide-react';
import { AddColumnButton } from './buttons/AddColumnButton';
import { useNavigate } from 'react-router-dom';

export const BoardPageHeader = ({ columns, setColumns, boardId }: any) => {
  const navigate = useNavigate();
  return (
    <header className=" flex justify-between">
      <h1 className="text-3xl font-bold mb-6 text-gray-100 flex items-center gap-x-4">
        <div
          className=" bg-slate-700 rounded-full cursor-pointer"
          onClick={() => navigate('/dashboard')}
        >
          <ArrowLeft className=" w-8 h-8 " />
        </div>
        Modern Dark Kanban Board
      </h1>
      {/* Add Column Button in top-right */}
      <AddColumnButton
        columns={columns}
        setColumns={setColumns}
        boardId={boardId}
      />
    </header>
  );
};
