import { create } from 'zustand';
import { userService } from '@/services/userService';

interface UserState {
  users: any[];
  currentUser: any | null;
  total: number;
  loading: boolean;
  // Updated signature to include optional search
  fetchUsers: (limit: number, skip: number, search?: string) => Promise<void>;
  fetchUserById: (id: string) => Promise<void>;
  clearCurrentUser: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  currentUser: null,
  total: 0,
  loading: false,

  fetchUsers: async (limit, skip, search = '') => {
    set({ loading: true });
    try {
      // If 'search' has a value, userService.getAll handles the /search endpoint.
      const data = await userService.getAll(limit, skip, search);
      
      set({ 
        users: data.users, 
        total: data.total, 
        loading: false 
      });
    } catch (error) {
      console.error("Failed to fetch users:", error);
      set({ loading: false, users: [], total: 0 });
    }
  },

  fetchUserById: async (id) => {
    const existingUser = get().users.find((u) => u.id.toString() === id);
    if (existingUser) {
      set({ currentUser: existingUser });
      return;
    }

    set({ loading: true });
    try {
      const data = await userService.getById(id);
      set({ currentUser: data, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },

  clearCurrentUser: () => set({ currentUser: null }),
}));