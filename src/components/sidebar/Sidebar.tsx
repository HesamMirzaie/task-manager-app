import { Projects } from './Projects';
import { ProjectUsers } from './ProjectUsers';
import { useState } from 'react';
import { Board } from '../../pages/dashboard/Dashboard';
import { CreateBoardButton } from '../dashboard/buttons/CreateBoardButton';

export const Sidebar = () => {
  const [activeBoard, setActiveBoard] = useState<Board | null>(null);

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
