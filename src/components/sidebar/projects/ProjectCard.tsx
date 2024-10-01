import { EllipsisVertical } from 'lucide-react';
import { Card } from '../../ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { EditBoardButton } from './buttons/EditBoardButton';
import { DeleteBoardButton } from './buttons/DeleteBoardButton';
import { Button } from '../../ui/button';

export const ProjectCard = ({ board, activeBoard, setActiveBoard }: any) => {
  return (
    <Card
      className={`w-full flex items-center h-12 mb-2 transition-colors cursor-pointer rounded-md shadow-sm border ${
        activeBoard?.id === board.id
          ? 'bg-blue-600 text-white border-blue-500'
          : 'bg-white hover:bg-gray-100 border-gray-200'
      }`}
      onClick={() => setActiveBoard(board)}
    >
      <div className="flex items-center w-full p-2">
        <div
          className={`w-8 h-8 flex justify-center items-center text-sm font-medium rounded-full transition-all duration-200 ${
            activeBoard?.id === board.id
              ? 'bg-white text-blue-600'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          <img
            src={board.board_image}
            alt={board.board_title}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        <p className="flex-1 ml-3 font-medium">{board.board_title}</p>
        <Popover>
          <PopoverTrigger>
            <EllipsisVertical className="h-full w-full" />
          </PopoverTrigger>
          <PopoverContent className="bg-gray-100 border flex flex-col p-2 rounded-lg shadow-lg">
            <EditBoardButton board={board} />
            <DeleteBoardButton board={board} setActiveBoard={setActiveBoard} />
          </PopoverContent>
        </Popover>
      </div>
    </Card>
  );
};
