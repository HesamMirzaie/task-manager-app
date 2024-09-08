import { create } from 'zustand';
import supabase from '../utils/supabase';

// Define types for the Board and the Zustand store
type Board = {
  id: string;
  border_name: string;
  user_id: string;
};

type BoardState = {
  borders: Board[];
  fetchBorders: () => Promise<void>;
  addBorder: () => Promise<void>;
  deleteBorder: (id: string) => Promise<void>;
};

// Create the Zustand store with typed state and actions
export const useBoard = create<BoardState>((set) => ({
  borders: [],

  fetchBorders: async () => {
    try {
      const { data, error } = await supabase.from('borders').select('*');
      if (error) {
        throw error;
      }
      set({ borders: data || [] });
    } catch (error) {
      console.error('Error fetching borders:', error);
    }
  },

  addBorder: async () => {
    try {
      const { data, error } = await supabase
        .from('borders')
        .insert([{ border_name: 'New Board', user_id: 'hesam@hesam.com' }])
        .select();
      if (error) {
        throw error;
      }

      set((state) => ({
        borders: [...state.borders, ...(data || [])],
      }));
    } catch (error) {
      console.error('Error adding border:', error);
    }
  },

  deleteBorder: async (id: string) => {
    try {
      const { error } = await supabase.from('borders').delete().eq('id', id);
      if (error) {
        throw error;
      }

      set((state) => ({
        borders: state.borders.filter((border) => border.id !== id),
      }));
    } catch (error) {
      console.error('Error deleting border:', error);
    }
  },
}));
