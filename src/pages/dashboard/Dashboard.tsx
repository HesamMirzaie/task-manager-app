import { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

import { Plus, Edit, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';

interface Board {
  id: string;
  board_title: string;
  board_description: string;
  board_users: string[];
}

export default function KanbanDashboard() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editBoard, setEditBoard] = useState<Board | null>(null);
  const [newBoardTitle, setNewBoardTitle] = useState<string>('');
  const [newBoardDescription, setNewBoardDescription] = useState<string>('');
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchBoards = async (): Promise<void> => {
      try {
        const response = await axios.get<Board[]>(
          'http://localhost:5000/boards'
        );
        setBoards(response.data);
      } catch (err) {
        console.error('Error fetching boards:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBoards();
  }, []);

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
      setBoards((prevBoards) => [...prevBoards, response.data]);
      setNewBoardTitle('');
      setNewBoardDescription('');
    } catch (error) {
      console.error('Error creating board:', error);
    }
  };

  const updateBoard = async (): Promise<void> => {
    if (!editBoard) return;

    try {
      const updatedBoard = {
        id: editBoard.id, // Retain the old ID
        board_title: editBoard.board_title,
        board_description: editBoard.board_description,
        board_users: editBoard.board_users, // Retain the old users
      };

      const response = await axios.put<Board>(
        `http://localhost:5000/boards/${editBoard.id}`,
        updatedBoard
      );

      setBoards((prevBoards) =>
        prevBoards.map((board) =>
          board.id === editBoard.id ? response.data : board
        )
      );
      setEditBoard(null);
    } catch (error) {
      console.error('Error updating board:', error);
    }
  };

  const deleteBoard = async (id: string): Promise<void> => {
    try {
      await axios.delete(`http://localhost:5000/boards/${id}`);
      setBoards((prevBoards) => prevBoards.filter((board) => board.id !== id));
    } catch (error) {
      console.error('Error deleting board:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className=" w-full p-4 bg-gray-900 text-white min-h-screen">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Kanban Boards</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
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
      </header>

      {boards.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {boards.map((board) => (
            <Card
              key={board.id}
              className="bg-gray-800 border-gray-700 cursor-pointer hover:bg-gray-700 transition-colors"
            >
              <CardHeader>
                <CardTitle>{board.board_title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400">
                  {board.board_description}
                </p>
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
                      setEditBoard({
                        ...board,
                        board_users: board.board_users,
                      });
                    }}
                    className="text-gray-400 hover:text-white"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteBoard(board.id);
                    }}
                    className="text-gray-400 hover:text-white"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-xl text-gray-400">
            No boards available. Create your first board to get started!
          </p>
        </div>
      )}

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
    </div>
  );
}
