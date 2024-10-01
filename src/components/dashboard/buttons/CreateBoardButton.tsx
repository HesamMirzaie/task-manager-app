// UI Component
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
// React
import { useState } from 'react';
// Hooks
// Component
import { Board } from '../../../pages/dashboard/Dashboard';
// Third party Hooks or functions
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAuthStore from '../../../store/useUser';

export const CreateBoardButton = () => {
  const [newBoardTitle, setNewBoardTitle] = useState<string>('');
  const [newBoardDescription, setNewBoardDescription] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();

  const createBoardMutation = useMutation({
    mutationFn: async (newBoard: Board) => {
      const response = await axios.post<Board>(
        'http://localhost:5000/boards',
        newBoard
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['boards']);
      setNewBoardTitle('');
      setNewBoardDescription('');
      setIsDialogOpen(false);
    },
    onError: (error) => {
      console.error('Error creating board:', error);
    },
  });

  const handleCreateBoard = () => {
    const newBoard: Board = {
      id: uuidv4(),
      board_title: newBoardTitle,
      board_description: newBoardDescription,
      board_users: [user.user.email],
    };
    createBoardMutation.mutate(newBoard);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 rounded-md px-4 py-2 flex items-center space-x-2 shadow-lg hover:shadow-xl"
          onClick={() => setIsDialogOpen(true)}
        >
          <Plus className="h-5 w-5" />
          <span>Create Board</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white text-gray-800 border border-gray-300 rounded-lg shadow-xl max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-600">
            Create a new board
          </DialogTitle>
          <DialogDescription className="text-gray-600 mt-2">
            Add a title and description for your new Kanban board.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-6">
          <div className="space-y-2">
            <label
              htmlFor="boardTitle"
              className="text-sm font-medium text-gray-700"
            >
              Board Title
            </label>
            <Input
              id="boardTitle"
              placeholder="Enter board title"
              value={newBoardTitle}
              onChange={(e) => setNewBoardTitle(e.target.value)}
              className="bg-gray-100 text-gray-800 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 rounded-md transition-all duration-200 placeholder:text-gray-500"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="boardDescription"
              className="text-sm font-medium text-gray-700"
            >
              Board Description
            </label>
            <Textarea
              id="boardDescription"
              placeholder="Enter board description"
              value={newBoardDescription}
              onChange={(e) => setNewBoardDescription(e.target.value)}
              className="bg-gray-100 text-gray-800 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 rounded-md transition-all duration-200 min-h-[100px] placeholder:text-gray-500"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleCreateBoard}
            className="bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 rounded-full px-6 py-2 shadow-md hover:shadow-lg"
          >
            Create Board
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
