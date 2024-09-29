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
import { Avatar, AvatarFallback } from '../ui/avatar';

export const BoardCard = ({ board }: any) => {
  const navigate = useNavigate();

  return (
    <>
      <Card
        key={board.id}
        className="flex flex-col justify-between bg-gray-800 border-gray-700 cursor-pointer hover:bg-gray-700 transition-all duration-300 ease-in-out hover:shadow-lg"
        onClick={() => navigate(`/dashboard/${board.id}`)}
      >
        <CardHeader>
          <CardTitle>{board.board_title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-400">{board.board_description}</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex">
            {board.board_users.map((user: any, idx: number) => (
              <Avatar key={idx} className="mx-[-4px] w-8 h-8">
                <AvatarFallback className="bg-slate-400 text-primary-foreground">
                  {getFirstTwoLetters(user)}
                </AvatarFallback>
              </Avatar>
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
