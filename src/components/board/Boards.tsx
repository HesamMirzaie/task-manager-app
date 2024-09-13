import { useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import BoardList from './BoardList';
import AddBoardButton from './AddBoardButton';
import { useBoardStore } from '../../store/useBoardStore';

export function Boards({ user }: { user: { email: string } }) {
  const { boards, fetchBoards, addBoard, reorderBoards } = useBoardStore();

  useEffect(() => {
    fetchBoards(user.email);
  }, [fetchBoards, user.email]);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = boards.findIndex((item) => item.id === active.id);
      const newIndex = boards.findIndex((item) => item.id === over.id);
      const reorderedBoards = arrayMove(boards, oldIndex, newIndex);
      reorderBoards(reorderedBoards);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 30 } })
  );

  return (
    <div className="p-8 bg-gradient-to-br from-purple-50 to-indigo-100 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-indigo-900">Your Boards</h1>
        <AddBoardButton
          onAdd={(boardName) => addBoard(boardName, user.email)}
        />
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={boards.map((board) => board.id)}
          strategy={horizontalListSortingStrategy}
        >
          <BoardList boards={boards} />
        </SortableContext>
      </DndContext>
    </div>
  );
}
