import { BoardHeader } from './BoardHeader';
import { ColumnsContainer } from './ColumnsContainer';
import { CreateColumnButton } from './CreateColumnButton';

export const Board = ({ activeBoard, filteredColumns }: any) => {
  return (
    <main>
      <BoardHeader activeBoard={activeBoard} />

      <div className="m-auto flex min-h-full w-full items-center overflow-x-auto overflow-y-hidden px-[40px] pt-[20px] bg-gray-50">
        <div className="flex gap-4">
          <ColumnsContainer filteredColumns={filteredColumns} />
          <CreateColumnButton activeBoard={activeBoard} />
        </div>
      </div>
    </main>
  );
};
