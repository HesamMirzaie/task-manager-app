import { Edit } from 'lucide-react';
import { Button } from '../../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { useState } from 'react';
import { Board } from '../../../pages/dashboard/Dashboard';
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
        className="text-gray-400 hover:text-indigo-400 transition-colors duration-200"
      >
        <Edit className="h-4 w-4" />
      </Button>
      {editBoard && (
        <Dialog open={!!editBoard} onOpenChange={() => setEditBoard(null)}>
          <DialogContent
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-900 text-white border border-gray-700 rounded-lg shadow-2xl max-w-md mx-auto"
          >
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-indigo-400">
                Edit Board
              </DialogTitle>
              <DialogDescription className="text-gray-400 mt-2">
                Update the title and description of your Kanban board.
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
                  value={editBoard.board_title}
                  onChange={(e) =>
                    setEditBoard({ ...editBoard, board_title: e.target.value })
                  }
                  className="bg-gray-800 text-white border-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 rounded-md transition-all duration-200"
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
                  value={editBoard.board_description}
                  onChange={(e) =>
                    setEditBoard({
                      ...editBoard,
                      board_description: e.target.value,
                    })
                  }
                  className="bg-gray-800 text-white border-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 rounded-md transition-all duration-200 min-h-[100px]"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={updateBoard}
                className="bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200 rounded-full px-6 py-2 shadow-md hover:shadow-lg"
              >
                Update Board
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
