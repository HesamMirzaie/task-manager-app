import { Projects } from './projects/Projects';
import { CreateBoardButton } from './CreateBoardButton';

export const Sidebar = ({ activeBoard, setActiveBoard }: any) => {
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
