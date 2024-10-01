import { ArrowLeft } from 'lucide-react';
import { AddColumnButton } from './buttons/AddColumnButton';
import { useNavigate } from 'react-router-dom';

export const BoardPageHeader = ({ columns, boardId }: any) => {
  const navigate = useNavigate();
  return (
    <header className=" flex justify-between mb-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-100 flex items-center gap-x-4">
        <div
          className=" bg-slate-700 rounded-full cursor-pointer"
          onClick={() => navigate('/dashboard')}
        >
          <ArrowLeft className=" w-8 h-8 " />
        </div>
        Modern Dark Kanban Board
      </h1>
      {/* <AddColumnButton boardId={boardId} /> */}
    </header>
  );
};
