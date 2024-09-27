import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';

// Components
import { DeleteBoardButton } from './buttons/DeleteBoardButton';
import { OpenBoardButton } from './buttons/OpenBoardButton';
import { EditBoardButton } from './buttons/EditBoardButton';

export const BoardCard = ({ board, setBoards }: any) => {
  return (
    <>
      {/*  */}
      <Card
        key={board.id}
        className="bg-gray-800 border-gray-700 cursor-pointer hover:bg-gray-700 transition-colors"
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
        <CardFooter className="flex justify-between">
          <OpenBoardButton board={board} />
          <div>
            <EditBoardButton setBoards={setBoards} board={board} />
            <DeleteBoardButton setBoards={setBoards} board={board} />
          </div>
        </CardFooter>
        {/*  */}
      </Card>
    </>
  );
};
