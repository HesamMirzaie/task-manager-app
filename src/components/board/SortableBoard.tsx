import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Board } from './Board';

interface SortableBoardProps {
  board: any;
  editBoard: (id: string, newName: string) => void;
  deleteBoard: (id: string) => void;
}

export function SortableBoard({
  board,
  editBoard,
  deleteBoard,
}: SortableBoardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: board.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Board board={board} editBoard={editBoard} deleteBoard={deleteBoard} />
    </div>
  );
}
