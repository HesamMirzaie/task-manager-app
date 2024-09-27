import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';

import { useNavigate } from 'react-router-dom';

import { EditBoardButton } from './EditBoardbutton';
import { DeleteBoardButton } from './DeleteBoardButton';

export const BoardCard = ({ board, setBoards }: any) => {
  const navigate = useNavigate();

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
            <EditBoardButton setBoards={setBoards} board={board} />
            <DeleteBoardButton setBoards={setBoards} board={board} />
          </div>
        </CardFooter>
      </Card>
    </>
  );
};
