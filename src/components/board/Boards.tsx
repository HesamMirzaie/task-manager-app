import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import supabase from '../../utils/supabase';
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
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableBoard } from './SortableBoard'; // New component for sortable boards
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { Button } from '../ui/button';
import { Label } from '@radix-ui/react-label';
import { Input } from '../ui/input';

export function Boards({ user }: { user: { email: string } }) {
  const [boards, setBoards] = useState<any[]>([]);
  const [newBoardName, setNewBoardName] = useState(''); // State to track new board name

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
            border_name: newBoardName,
            user_id: user.email,
            order: boards.length, // New board gets the next order value
          },
        ])
        .select();

      if (error) throw error;

      setBoards((prevBoards) => [...prevBoards, ...data]);
      setNewBoardName(''); // Reset the input field after adding the board
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
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 30,
      },
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
        const updates = reorderedBoards.map((board, index) => ({
          id: board.id,
          order: index,
        }));

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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-indigo-900">Your Boards</h1>

        {/* Add New Board button opens the sheet */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Add New Board</Button>
          </SheetTrigger>
          <SheetContent className="bg-white">
            <SheetHeader>
              <SheetTitle>Add New Board</SheetTitle>
              <SheetDescription>
                Create a new board by providing a name below.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="boardName" className="text-right">
                  Board Name
                </Label>
                <Input
                  id="boardName"
                  value={newBoardName}
                  onChange={(e) => setNewBoardName(e.target.value)}
                  placeholder="Enter board name"
                  className="col-span-3"
                />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button onClick={addBoard} type="submit">
                  Create Board
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

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
          </motion.div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
