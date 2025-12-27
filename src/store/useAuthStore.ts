import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { authService } from '@/services/authService';

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  _hasHydrated: boolean;
  
  // Actions
  setHasHydrated: (state: boolean) => void;
  login: (username: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      _hasHydrated: false, 

      // --- Actions ---
      
      setHasHydrated: (state) => set({ _hasHydrated: state }),

      login: async (username, password) => {
        set({ loading: true });
        try {
          const data = await authService.login(username.trim(), password.trim());

          set({
            user: data,
            token: data.token,
            isAuthenticated: true,
            loading: false,
          });
          return { success: true };
        } catch (error: any) {
          set({ loading: false });
          return { 
            success: false, 
            message: error.message || 'Invalid credentials' 
          };
        }
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
        if (typeof window !== 'undefined') {
            localStorage.removeItem('auth-storage');
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHasHydrated(true);
        }
      },
    }
  )
);