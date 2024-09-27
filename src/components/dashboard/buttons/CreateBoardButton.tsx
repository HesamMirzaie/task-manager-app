import { Plus } from 'lucide-react';
import { Button } from '../../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../ui/dialog';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { Board } from '../../../pages/dashboard/Dashboard';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

export const CreateBoardButton = ({ setBoards }: any) => {
  const [newBoardTitle, setNewBoardTitle] = useState<string>('');
  const [newBoardDescription, setNewBoardDescription] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false); // New state for dialog
  const { user } = useAuth();

  const createBoard = async (): Promise<void> => {
    try {
      const newBoard: Board = {
        id: uuidv4(),
        board_title: newBoardTitle,
        board_description: newBoardDescription,
        board_users: [user.email],
      };

      const response = await axios.post<Board>(
        'http://localhost:5000/boards',
        newBoard
      );

      setBoards((prevBoards: any) => [...prevBoards, response.data]);
      setNewBoardTitle('');
      setNewBoardDescription('');
      setIsDialogOpen(false); // Close dialog after creating board
    } catch (error) {
      console.error('Error creating board:', error);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200 rounded-full px-4 py-2 flex items-center space-x-2 shadow-lg hover:shadow-xl"
          onClick={() => setIsDialogOpen(true)}
        >
          <Plus className="h-5 w-5" />
          <span>Create Board</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-900 text-white border border-gray-700 rounded-lg shadow-2xl max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-indigo-400">
            Create a new board
          </DialogTitle>
          <DialogDescription className="text-gray-400 mt-2">
            Add a title and description for your new Kanban board.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-6">
          <div className="space-y-2">
            <label
              htmlFor="boardTitle"
              className="text-sm font-medium text-gray-300"
            >
              Board Title
            </label>
            <Input
              id="boardTitle"
              placeholder="Enter board title"
              value={newBoardTitle}
              onChange={(e) => setNewBoardTitle(e.target.value)}
              className="bg-gray-800 text-white border-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 rounded-md transition-all duration-200 placeholder:text-gray-500"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="boardDescription"
              className="text-sm font-medium text-gray-300"
            >
              Board Description
            </label>
            <Textarea
              id="boardDescription"
              placeholder="Enter board description"
              value={newBoardDescription}
              onChange={(e) => setNewBoardDescription(e.target.value)}
              className="bg-gray-800 text-white border-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 rounded-md transition-all duration-200 min-h-[100px] placeholder:text-gray-500"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={createBoard}
            className="bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200 rounded-full px-6 py-2 shadow-md hover:shadow-lg"
          >
            Create Board
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
