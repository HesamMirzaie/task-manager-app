import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { DeleteBoardButton } from './buttons/DeleteBoardButton';
import { EditBoardButton } from './buttons/EditBoardButton';
import { getFirstTwoLetters } from '../../utils/helper';

export const BoardCard = ({ board }: any) => {
  const navigate = useNavigate();

  return (
    <>
      <Card
        key={board.id}
        className="flex flex-col justify-between w-[24rem] h-[10rem] bg-gray-800 border-gray-700 cursor-pointer hover:bg-gray-700 transition-all duration-300 ease-in-out hover:shadow-lg"
        onClick={() => navigate(`/dashboard/${board.id}`)}
      >
        <CardHeader>
          <CardTitle>{board.board_title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-400">{board.board_description}</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className=" flex ">
            {board.board_users.map((user: any, idx: number) => (
              <p
                className=" mx-[-4px] flex justify-center items-center gap-x-4 w-8 h-8 bg-slate-400 rounded-full"
                key={idx}
              >
                {getFirstTwoLetters(user)}
              </p>
            ))}
          </div>
          <div>
            <EditBoardButton board={board} />
            <DeleteBoardButton board={board} />
          </div>
        </CardFooter>
      </Card>
    </>
  );
};
