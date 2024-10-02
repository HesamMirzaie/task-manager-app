import { useMemo, useState } from 'react';
import { BoardHeader } from './BoardHeader';
import { ColumnsContainer } from '../columns/ColumnsContainer';
import { CreateColumnButton } from '../columns/buttons/CreateColumnButton';
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios'; // Import Axios
import { IBoard, IColumn } from '../../../types/types';

interface BoardProps {
  activeBoard: IBoard;
  filteredColumns: IColumn[];
}

export const Board = ({ activeBoard, filteredColumns }: BoardProps) => {
  const [activeColumn, setActiveColumn] = useState<any>(null);
  const columnsId = useMemo(
    () => filteredColumns.map((col: any) => col.id),
    [filteredColumns]
  );
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 30,
      },
    })
  );
  const queryClient = useQueryClient();

  const updateColumnOrder = useMutation(
    async (updatedColumns: any[]) => {
      const updateRequests = updatedColumns.map(async (column) => {
        try {
          return await axios.put(
            `http://localhost:5000/columns/${column.id}`,
            column,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
        } catch (error) {
          console.error('Error updating column:', error);
          throw error; // This will trigger the onError callback
        }
      });
      return Promise.all(updateRequests);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['columns']);
      },
      onError: (error) => {
        // Handle the error here if needed
        console.error('Error updating column order:', error);
      },
    }
  );

  // Dnd Functions
  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === 'column') {
      setActiveColumn(event.active.data.current.column);
    }
  };
  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    const newColumns = arrayMove(
      filteredColumns,
      filteredColumns.findIndex((col: any) => col.id === activeColumnId),
      filteredColumns.findIndex((col: any) => col.id === overColumnId)
    );

    const updatedColumns = newColumns.map((col, index) => ({
      ...col,
      order: index + 1,
    }));

    updateColumnOrder.mutate(updatedColumns);
  };
  // JSX
  return (
    <main>
      <BoardHeader activeBoard={activeBoard} />
      <div className="p-1 m-auto flex min-h-full w-full items-center overflow-x-auto overflow-y-hidden px-[40px] pt-[20px]">
        <DndContext
          sensors={sensors}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        >
          <div className="flex gap-4">
            <ColumnsContainer
              filteredColumns={filteredColumns}
              columnsId={columnsId}
              activeColumn={activeColumn}
            />
            <CreateColumnButton activeBoard={activeBoard} />
          </div>
        </DndContext>
      </div>
    </main>
  );
};
