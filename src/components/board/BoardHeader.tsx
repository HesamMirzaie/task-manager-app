import { AddColumnButton } from './AddColumnButton';

export const BoardHeader = ({ columns, setColumns, boardId }: any) => {
  return (
    <header className=" flex justify-between">
      <h1 className="text-3xl font-bold mb-6 text-gray-100">
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
