import { useState } from 'react';
import { Button } from '../ui/button';

import { Input } from '../ui/input';
import { Dialog, DialogContent, DialogFooter, DialogTitle } from '../ui/dialog';

interface AddBoardButtonProps {
  onAdd: (boardName: string) => void;
}

const AddBoardButton: React.FC<AddBoardButtonProps> = ({ onAdd }) => {
  const [boardName, setBoardName] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddBoard = () => {
    if (boardName.trim() !== '') {
      onAdd(boardName);
      setBoardName('');
      setIsDialogOpen(false);
    }
  };

  return (
    <>
      <Button
        className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md"
        onClick={() => setIsDialogOpen(true)}
      >
        Add New Board
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
          <DialogTitle className="text-2xl font-semibold mb-4">
            Add New Board
          </DialogTitle>
          <div className="py-4">
            <Input
              id="boardName"
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
              placeholder="Enter board name"
              className="w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <DialogFooter className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              className="text-gray-600 border-gray-300"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddBoard}
              disabled={boardName.trim() === ''}
              className={`bg-indigo-600 text-white hover:bg-indigo-700 ${
                boardName.trim() === '' ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Create Board
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddBoardButton;
