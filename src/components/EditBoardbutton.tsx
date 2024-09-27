import { Edit } from 'lucide-react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useState } from 'react';
import { Board } from '../pages/dashboard/Dashboard';
import axios from 'axios';

export const EditBoardButton = ({ board, setBoards }: any) => {
  const [editBoard, setEditBoard] = useState<Board | null>(null);

  const updateBoard = async (): Promise<void> => {
    if (!editBoard) return;

    try {
      const updatedBoard = {
        id: editBoard.id,
        board_title: editBoard.board_title,
        board_description: editBoard.board_description,
        board_users: editBoard.board_users,
      };

      const response = await axios.put<Board>(
        `http://localhost:5000/boards/${editBoard.id}`,
        updatedBoard
      );

      setBoards((prevBoards: any) =>
        prevBoards.map((board: any) =>
          board.id === editBoard.id ? response.data : board
        )
      );
      setEditBoard(null); // Close the dialog after editing
    } catch (error) {
      console.error('Error updating board:', error);
    }
  };
  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          setEditBoard({ ...board });
        }}
        className="text-gray-400 hover:text-white"
      >
        <Edit className="h-4 w-4" />
      </Button>
      {editBoard && (
        <Dialog open={!!editBoard} onOpenChange={() => setEditBoard(null)}>
          <DialogContent className="bg-gray-800 text-white">
            <DialogHeader>
              <DialogTitle>Edit Board</DialogTitle>
              <DialogDescription className="text-gray-400">
                Update the title and description of your Kanban board.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input
                placeholder="Board Title"
                value={editBoard.board_title}
                onChange={(e) =>
                  setEditBoard({ ...editBoard, board_title: e.target.value })
                }
                className="bg-gray-700 text-white border-gray-600"
              />
              <Textarea
                placeholder="Board Description"
                value={editBoard.board_description}
                onChange={(e) =>
                  setEditBoard({
                    ...editBoard,
                    board_description: e.target.value,
                  })
                }
                className="bg-gray-700 text-white border-gray-600"
              />
            </div>
            <DialogFooter>
              <Button onClick={updateBoard}>Update Board</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
