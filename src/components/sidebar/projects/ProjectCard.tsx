import { EllipsisVertical } from 'lucide-react';
import { Card } from '../../ui/card';
import { EditBoardButton } from './buttons/EditBoardButton';
import { DeleteBoardButton } from './buttons/DeleteBoardButton';
import { Button } from '../../ui/button';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import { IBoard } from '../../../types/types';
interface ProjectCardProps {
  board: IBoard;
  activeBoard: IBoard | null;
  setActiveBoard: (board: IBoard | null) => void;
}
export const ProjectCard = ({
  board,
  activeBoard,
  setActiveBoard,
}: ProjectCardProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="p-2">
              <EllipsisVertical className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="space-y-1 bg-white rounded-md shadow-lg p-2 w-32">
            <EditBoardButton />
            <DeleteBoardButton
              setActiveBoard={setActiveBoard}
              boardId={board.id}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  );
};
