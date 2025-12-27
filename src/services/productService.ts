import { apiClient } from './apiClient';

export const productService = {
    getAll: (limit: number, skip: number, search: string = '', category: string = '') => {
        let path = '/products';
        
        // Priority: 1. Search, 2. Category, 3. All
        if (search) {
            path = '/products/search';
        } else if (category) {
            path = `/products/category/${category}`;
        }

        const queryParams = new URLSearchParams({
            limit: limit.toString(),
            skip: skip.toString(),
            ...(search && { q: search })
        });

        return apiClient(`${path}?${queryParams.toString()}`);
    },

    getCategories: () => apiClient('/products/categories'),
    getById: (id: number) => apiClient(`/products/${id}`),
};