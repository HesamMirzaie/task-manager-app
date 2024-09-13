import { create } from 'zustand';
import supabase from '../utils/supabase';

interface Board {
  id: string;
  border_name: string;
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
        .select<Board[]>('*') // Type assertion for the response
        .order('order', { ascending: true });

      if (error) throw error;

      set({
        boards: (data || []).filter((board) => board.user_id === userEmail),
      });
    } catch (error) {
      console.error('Error fetching boards:', error);
    }
  },

  // Add a new board
  addBoard: async (boardName: string, userEmail: string) => {
    try {
      // Fetch current number of boards to assign order
      const { data: allBoards, error: fetchError } = await supabase
        .from('borders')
        .select<Board[]>('*');

      if (fetchError) throw fetchError;

      const newOrder = allBoards?.length || 0;

      const { data, error } = await supabase
        .from('borders')
        .insert<Board>([
          {
            border_name: boardName,
            user_id: userEmail,
            order: newOrder,
          },
        ])
        .select();

      if (error) throw error;

      set((state) => ({ boards: [...state.boards, ...(data || [])] }));
    } catch (error) {
      console.error('Error adding board:', error);
    }
  },

  // Edit an existing board
  editBoard: async (id: string, newName: string) => {
    try {
      const { data, error } = await supabase
        .from('borders')
        .update({ border_name: newName })
        .eq('id', id)
        .select();

      if (error) throw error;

      set((state) => ({
        boards: state.boards.map((board) =>
          board.id === id ? { ...board, border_name: newName } : board
        ),
      }));
    } catch (error) {
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
    } catch (error) {
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
    } catch (error) {
      console.error('Error updating board order:', error);
    }
  },
}));
