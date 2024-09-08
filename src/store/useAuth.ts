// store/useAuth.ts
import { create } from 'zustand';
import supabase from '../utils/supabase';

export const useAuth = create((set) => ({
  user: null,
  error: null,

  // Login function
  handleLogin: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        set({ error: error.message });
        return { success: false, error: error.message };
      }

      set({ user: data?.user, error: null });
      return { success: true, error: null };
    } catch (error) {
      set({ error: 'An unexpected error occurred.' });
      return { success: false, error: 'An unexpected error occurred.' };
    }
  },
  handleSignOut: async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        set({ error: error.message });
        return { success: false, error: error.message };
      }

      set({ user: null, error: null }); // Clear user state on sign out
      return { success: true, error: null };
    } catch (error) {
      set({ error: 'An unexpected error occurred during sign out.' });
      return { success: false, error: 'An unexpected error occurred.' };
    }
  },
}));
