import { Projects } from './projects/Projects';
import { CreateBoardButton } from './CreateBoardButton';
import { IBoard } from '../../types/types';

interface SideBarProps {
  activeBoard: IBoard | null;
  setActiveBoard: (board: IBoard | null) => void;
}
export const Sidebar = ({ activeBoard, setActiveBoard }: SideBarProps) => {
  return (
    <div className="flex flex-col h-full w-64 bg-white border-r p-4">
      <div className=" flex-1">
        <h2 className="text-sm font-semibold mb-4">Projects</h2>
        <Projects activeBoard={activeBoard} setActiveBoard={setActiveBoard} />
      </div>
      <CreateBoardButton />
    </div>
  );
};
