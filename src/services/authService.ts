import { apiClient } from './apiClient';

export const authService = {
  login: async (username: string, password: string) => {
    return apiClient('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ 
        username, 
        password, 
        expiresInMins: 60 
      }),
    });
  },
};