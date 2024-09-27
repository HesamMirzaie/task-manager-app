import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';

// Components
import { DeleteBoardButton } from './buttons/DeleteBoardButton';
import { EditBoardButton } from './buttons/EditBoardButton';

export const BoardCard = ({ board, setBoards }: any) => {
  const navigate = useNavigate();

  return (
    <>
      <Card
        key={board.id}
        className="bg-gray-800 border-gray-700 cursor-pointer hover:bg-gray-700 transition-all duration-300 ease-in-out hover:transform hover:scale-105 hover:shadow-lg"
        onClick={() => navigate(`/dashboard/${board.id}`)}
      >
        {/*  */}
        <CardHeader>
          <CardTitle>{board.board_title}</CardTitle>
        </CardHeader>
        {/*  */}
        <CardContent>
          <p className="text-sm text-gray-400">{board.board_description}</p>
        </CardContent>
        {/*  */}
        <CardFooter className="flex justify-end">
          <EditBoardButton setBoards={setBoards} board={board} />
          <DeleteBoardButton setBoards={setBoards} board={board} />
        </CardFooter>
        {/*  */}
      </Card>
    </>
  );
};
