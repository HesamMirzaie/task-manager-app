import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import supabase from '../utils/supabase';
import { Board } from './Board';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableBoard } from './SortableBoard'; // New component for sortable boards

export function Boards({ user }: { user: { email: string } }) {
  const [boards, setBoards] = useState<any[]>([]);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const { data, error } = await supabase
          .from('borders')
          .select('*')
          .order('order', { ascending: true }); // Fetch the boards ordered by the 'order' column
        if (error) throw error;
        setBoards(data.filter((board) => board.user_id === user.email));
      } catch (error) {
        console.error('Error fetching boards:', error);
      }
    };
    fetchBoards();
  }, [user.email]);

  const addBoard = async () => {
    try {
      const { data, error } = await supabase
        .from('borders')
        .insert([
          {
            border_name: 'New Board',
            user_id: user.email,
            order: boards.length, // New board gets the next order value
          },
        ])
        .select();

      if (error) throw error;

      setBoards((prevBoards) => [...prevBoards, ...data]);
    } catch (error) {
      console.error('Error adding board:', error);
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

  // DnD Kit sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = boards.findIndex((item) => item.id === active.id);
      const newIndex = boards.findIndex((item) => item.id === over.id);

      const reorderedBoards = arrayMove(boards, oldIndex, newIndex);

      setBoards(reorderedBoards);

      // Update the order in Supabase
      try {
        // Prepare the updated order data
        const updates = reorderedBoards.map((board, index) => ({
          id: board.id,
          order: index,
        }));

        // Send batch update request to Supabase
        const { error } = await supabase.from('borders').upsert(updates);

        if (error) throw error;

        console.log('Board order updated successfully');
      } catch (error) {
        console.error('Error updating board order:', error);
      }
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-purple-50 to-indigo-100 min-h-screen">
      <h1 className="text-4xl font-bold text-indigo-900 mb-8">Your Boards</h1>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={boards.map((board) => board.id)}
          strategy={verticalListSortingStrategy}
        >
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {boards?.map((board) => (
              <SortableBoard
                key={board.id}
                board={board}
                editBoard={editBoard}
                deleteBoard={deleteBoard}
              />
            ))}

            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-indigo-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
              onClick={addBoard}
            >
              <div className="p-6 flex flex-col items-center justify-center h-full">
                <Plus className="h-12 w-12 text-indigo-500 mb-2" />
                <p className="text-indigo-700 font-semibold">Add Board</p>
              </div>
            </motion.div>
          </motion.div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
