import { create } from 'zustand';
import supabase from '../utils/supabase';

export const useBoard = create((set) => ({
  boards: [],

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
        .insert([{ border_name: 'someValue', user_id: 'hesam@hesam.com' }])
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
