import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '../ui/sheet';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface AddBoardButtonProps {
  onAdd: (boardName: string) => void;
}

const AddBoardButton: React.FC<AddBoardButtonProps> = ({ onAdd }) => {
  const [boardName, setBoardName] = useState('');
  const [isOpen, setIsOpen] = useState(false); // State to control the Sheet visibility

  const handleAddBoard = () => {
    if (boardName.trim() !== '') {
      onAdd(boardName);
      setBoardName('');
      setIsOpen(false); // Close the Sheet after adding the board
    }
  };

  return (
    <>
      <Button
        className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md"
        onClick={() => setIsOpen(true)} // Open the Sheet when the button is clicked
      >
        Add New Board
      </Button>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        {' '}
        {/* Control Sheet open/close */}
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
    </>
  );
};

export default AddBoardButton;
