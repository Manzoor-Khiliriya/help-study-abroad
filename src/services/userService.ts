import { apiClient } from './apiClient';

export const userService = {
  getAll: (limit: number, skip: number, search: string = '') => {
    // If there is a search term, use the /search path; otherwise, use the base path
    const path = search ? '/users/search' : '/users';
    
    const queryParams = new URLSearchParams({
      limit: limit.toString(),
      skip: skip.toString(),
      ...(search && { q: search })
    });

    return apiClient(`${path}?${queryParams.toString()}`);
  },

  // Single User
  getById: (id: string) => 
    apiClient(`/users/${id}`),
    
};