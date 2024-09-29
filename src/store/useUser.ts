import { create } from 'zustand';

const useAuthStore = create(() => ({
  user: JSON.parse(
    localStorage.getItem('sb-mgfzsdjjigxhvjpkxtnv-auth-token') || '{}'
  ),
}));

export default useAuthStore;
