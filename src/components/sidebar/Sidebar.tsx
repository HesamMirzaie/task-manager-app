import { Projects } from './projects/Projects';
import { ProjectUsers } from './ProjectUsers';
import { CreateBoardButton } from './CreateBoardButton';

export const Sidebar = ({ activeBoard, setActiveBoard }) => {
  return (
    <div className="flex flex-col h-full w-64 bg-white border-r p-4">
      <div className=" mb-12">
        <h2 className="text-sm font-semibold mb-2">Projects</h2>
        <Projects activeBoard={activeBoard} setActiveBoard={setActiveBoard} />
      </div>
      <div className=" flex-1">
        <h2 className="text-sm font-semibold mb-2">Team members</h2>
        <ProjectUsers activeBoard={activeBoard} />
      </div>
      <CreateBoardButton />
    </div>
  );
};
