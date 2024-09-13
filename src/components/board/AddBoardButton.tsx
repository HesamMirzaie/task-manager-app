import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface AddBoardButtonProps {
  onAdd: (boardName: string) => void;
}

const AddBoardButton: React.FC<AddBoardButtonProps> = ({ onAdd }) => {
  const [boardName, setBoardName] = useState('');

  const handleAddBoard = () => {
    if (boardName.trim() !== '') {
      onAdd(boardName);
      setBoardName('');
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md">
          Add New Board
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-white">
        <SheetHeader>
          <SheetTitle>Add New Board</SheetTitle>
          <SheetDescription>
            Create a new board by providing a name below.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <Input
            id="boardName"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            placeholder="Enter board name"
            className="col-span-3"
          />
        </div>
        <SheetFooter>
          <Button
            onClick={handleAddBoard}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Create Board
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default AddBoardButton;
