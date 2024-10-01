import { Edit } from 'lucide-react';
import { Button } from '../../../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../ui/dialog';
import { Input } from '../../../ui/input';
import { Textarea } from '../../../ui/textarea';
import { useState } from 'react';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Board } from '../../../../types/types';

export const EditBoardButton = ({ board }: any) => {
  const [editBoard, setEditBoard] = useState<Board | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const updateBoardMutation = useMutation({
    mutationFn: async () => {
      if (!editBoard) return;
      const updatedBoard = {
        id: editBoard.id,
        board_title: editBoard.board_title,
        board_description: editBoard.board_description,
        board_image: editBoard.board_image,
        board_users: editBoard.board_users,
      };
      await axios.put(
        `http://localhost:5000/boards/${editBoard.id}`,
        updatedBoard
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['boards']);
      setEditBoard(null);
      setIsDialogOpen(false);
    },
    onError: (error) => {
      console.error('Error updating board:', error);
    },
  });

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            setEditBoard({ ...board });
            setIsDialogOpen(true);
          }}
          className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
        >
          <span>Edit</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white text-gray-800 border border-gray-300 rounded-lg shadow-xl max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-600">
            Edit Board
          </DialogTitle>
          <DialogDescription className="text-gray-600 mt-2">
            Update the title and description of your Kanban board.
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
              value={editBoard?.board_title || ''}
              onChange={(e) =>
                setEditBoard((prev) =>
                  prev ? { ...prev, board_title: e.target.value } : null
                )
              }
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
              value={editBoard?.board_description || ''}
              onChange={(e) =>
                setEditBoard((prev) =>
                  prev ? { ...prev, board_description: e.target.value } : null
                )
              }
              className="bg-gray-100 text-gray-800 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 rounded-md transition-all duration-200 min-h-[100px] placeholder:text-gray-500"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={() => updateBoardMutation.mutate()}
            className="bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 rounded-full px-6 py-2 shadow-md hover:shadow-lg"
          >
            Update Board
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
