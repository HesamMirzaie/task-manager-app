import { Plus } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { Board } from '../../pages/dashboard/Dashboard';
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
        <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Create Board
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-800 text-white">
        <DialogHeader>
          <DialogTitle>Create a new board</DialogTitle>
          <DialogDescription className="text-gray-400">
            Add a title and description for your new Kanban board.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            placeholder="Board Title"
            value={newBoardTitle}
            onChange={(e) => setNewBoardTitle(e.target.value)}
            className="bg-gray-700 text-white border-gray-600"
          />
          <Textarea
            placeholder="Board Description"
            value={newBoardDescription}
            onChange={(e) => setNewBoardDescription(e.target.value)}
            className="bg-gray-700 text-white border-gray-600"
          />
        </div>
        <DialogFooter>
          <Button onClick={createBoard}>Create Board</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
