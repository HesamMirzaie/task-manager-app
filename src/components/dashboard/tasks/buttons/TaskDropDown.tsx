import { useState } from 'react';
import { Button } from '../../../ui/button';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../../../ui/dropdown-menu';
import { EllipsisVertical } from 'lucide-react';
import { EditTaskButton } from './EditTaskButton';
import { DeleteTaskButton } from './DeleteTaskButton';

export const TaskDropDown = ({ taskId }: any) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="absolute right-4">
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="p-2">
            <EllipsisVertical className="w-5 h-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="space-y-1 bg-white rounded-md shadow-lg p-2 w-32">
          <EditTaskButton taskId={taskId} />
          <DeleteTaskButton taskId={taskId} />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
