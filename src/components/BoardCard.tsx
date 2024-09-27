import { Edit, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
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
import axios from 'axios';
import { Board } from '../pages/dashboard/Dashboard';

export const BoardCard = ({ board, setBoards }: any) => {
  const [editBoard, setEditBoard] = useState<Board | null>(null);
  const [deleteBoardId, setDeleteBoardId] = useState<string | null>(null);

  const navigate = useNavigate();

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

  const deleteBoard = async (id: string): Promise<void> => {
    try {
      await axios.delete(`http://localhost:5000/boards/${id}`);
      setBoards((prevBoards: any) =>
        prevBoards.filter((board: any) => board.id !== id)
      );
      setDeleteBoardId(null); // Close the alert dialog after deleting
    } catch (error) {
      console.error('Error deleting board:', error);
    }
  };

  return (
    <>
      <Card
        key={board.id}
        className="bg-gray-800 border-gray-700 cursor-pointer hover:bg-gray-700 transition-colors"
      >
        <CardHeader>
          <CardTitle>{board.board_title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-400">{board.board_description}</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/dashboard/${board.id}`)}
            className="text-white hover:bg-gray-700"
          >
            Open Board
          </Button>
          <div>
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

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteBoardId(board.id); // Set the board ID to delete
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-gray-800 text-white">
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Board</AlertDialogTitle>
                  <AlertDialogDescription className="text-gray-400">
                    Are you sure you want to delete this board? This action
                    cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setDeleteBoardId(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => deleteBoard(deleteBoardId!)}
                    variant="destructive"
                  >
                    Delete
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardFooter>
      </Card>
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
