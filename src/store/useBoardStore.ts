import { create } from 'zustand';
import supabase from '../utils/supabase';
import { toast } from './toastStore'; // Assuming toastStore manages the toast notifications

interface Board {
  id: string;
  board_name: string; // Changed from border_name to board_name for consistency
  user_id: string;
  order: number;
}

interface BoardState {
  boards: Board[];
  fetchBoards: (userEmail: string) => Promise<void>;
  addBoard: (boardName: string, userEmail: string) => Promise<void>;
  editBoard: (id: string, newName: string) => Promise<void>;
  deleteBoard: (id: string) => Promise<void>;
  reorderBoards: (reorderedBoards: Board[]) => Promise<void>;
}

export const useBoardStore = create<BoardState>((set) => ({
  boards: [],

  // Fetch boards for the given user
  fetchBoards: async (userEmail: string) => {
    try {
      const { data, error } = await supabase
        .from('borders')
        .select<Board[]>('*')
        .order('order', { ascending: true });

      if (error) throw error;

      set({
        boards: (data || []).filter((board) => board.user_id === userEmail),
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Error fetching boards.',
        variant: 'destructive',
      });
      console.error('Error fetching boards:', error);
    }
  },

  // Add a new board
  addBoard: async (boardName: string, userEmail: string) => {
    try {
      const { data: allBoards, error: fetchError } = await supabase
        .from('borders')
        .select<Board[]>('*');

      if (fetchError) throw fetchError;

      const newOrder = allBoards?.length || 0;

      const { data, error } = await supabase
        .from('borders')
        .insert<Board>([
          {
            board_name: boardName,
            user_id: userEmail,
            order: newOrder,
          },
        ])
        .select();

      if (error) throw error;

      set((state) => ({ boards: [...state.boards, ...(data || [])] }));
      toast({
        title: 'Board added',
        description: `Successfully added ${boardName}.`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Error adding board.',
        variant: 'destructive',
      });
      console.error('Error adding board:', error);
    }
  },

  // Edit an existing board
  editBoard: async (id: string, newName: string) => {
    try {
      const { data, error } = await supabase
        .from('borders')
        .update({ board_name: newName })
        .eq('id', id)
        .select();

      if (error) throw error;

      set((state) => ({
        boards: state.boards.map((board) =>
          board.id === id ? { ...board, board_name: newName } : board
        ),
      }));
      toast({
        title: 'Board updated',
        description: `Board name changed to ${newName}.`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Error updating board.',
        variant: 'destructive',
      });
      console.error('Error editing board:', error);
    }
  },

  // Delete a board
  deleteBoard: async (id: string) => {
    try {
      const { error } = await supabase.from('borders').delete().eq('id', id);
      if (error) throw error;

      set((state) => ({
        boards: state.boards.filter((board) => board.id !== id),
      }));
      toast({
        title: 'Board deleted',
        description: 'Board successfully deleted.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Error deleting board.',
        variant: 'destructive',
      });
      console.error('Error deleting board:', error);
    }
  },

  // Reorder boards
  reorderBoards: async (reorderedBoards: Board[]) => {
    set({ boards: reorderedBoards });

    try {
      const updates = reorderedBoards.map((board, index) => ({
        id: board.id,
        order: index,
      }));

      const { error } = await supabase.from('borders').upsert(updates);

      if (error) throw error;
      toast({
        title: 'Boards reordered',
        description: 'Boards successfully reordered.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Error updating board order.',
        variant: 'destructive',
      });
      console.error('Error updating board order:', error);
    }
  },
}));
