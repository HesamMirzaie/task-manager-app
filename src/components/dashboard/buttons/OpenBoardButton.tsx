import { Button } from '../../ui/button';
import { useNavigate } from 'react-router-dom';

export const OpenBoardButton = ({ board }: any) => {
  const navigate = useNavigate();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => navigate(`/dashboard/${board.id}`)}
      className="text-white hover:bg-gray-700"
    >
      Open Board
    </Button>
  );
};
