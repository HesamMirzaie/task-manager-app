import { useEffect, useState } from 'react';
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
import supabase from '../../utils/supabase';
import BoardList from './BoardList';
import AddBoardButton from './AddBoardButton';

export function Boards({ user }: { user: { email: string } }) {
  const [boards, setBoards] = useState<any[]>([]);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const { data, error } = await supabase
          .from('borders')
          .select('*')
          .order('order', { ascending: true });
        if (error) throw error;
        setBoards(data.filter((board) => board.user_id === user.email));
      } catch (error) {
        console.error('Error fetching boards:', error);
      }
    };
    fetchBoards();
  }, [user.email]);

  const addBoard = async (boardName: string) => {
    try {
      const { data, error } = await supabase
        .from('borders')
        .insert([
          {
            border_name: boardName,
            user_id: user.email,
            order: boards.length,
          },
        ])
        .select();

      if (error) throw error;
      setBoards((prevBoards) => [...prevBoards, ...data]);
    } catch (error) {
      console.error('Error adding board:', error);
    }
  };

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = boards.findIndex((item) => item.id === active.id);
      const newIndex = boards.findIndex((item) => item.id === over.id);
      const reorderedBoards = arrayMove(boards, oldIndex, newIndex);
      setBoards(reorderedBoards);
      try {
        const updates = reorderedBoards.map((board, index) => ({
          id: board.id,
          order: index,
        }));
        const { error } = await supabase.from('borders').upsert(updates);
        if (error) throw error;
      } catch (error) {
        console.error('Error updating board order:', error);
      }
    }
  };

  const editBoard = async (id: string, newName: string) => {
    try {
      const { data, error } = await supabase
        .from('borders')
        .update({ border_name: newName })
        .eq('id', id)
        .select();
      if (error) throw error;
      setBoards((prevBoards) =>
        prevBoards.map((board) =>
          board.id === id ? { ...board, border_name: newName } : board
        )
      );
    } catch (error) {
      console.error('Error editing board:', error);
    }
  };

  const deleteBoard = async (id: string) => {
    try {
      const { error } = await supabase.from('borders').delete().eq('id', id);
      if (error) throw error;
      setBoards((prevBoards) => prevBoards.filter((board) => board.id !== id));
    } catch (error) {
      console.error('Error deleting board:', error);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 30 } })
  );

  return (
    <div className="p-8 bg-gradient-to-br from-purple-50 to-indigo-100 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-indigo-900">Your Boards</h1>
        <AddBoardButton onAdd={addBoard} />
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
          <BoardList
            boards={boards}
            editBoard={editBoard}
            deleteBoard={deleteBoard}
          />
        </SortableContext>
      </DndContext>
    </div>
  );
}
