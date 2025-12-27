import { create } from 'zustand';
import { productService } from '@/services/productService';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage?: number;
  weight?: number;
  rating: number;
  stock: number;
  brand: string;
  sku: string;
  category: string;
  thumbnail: string;
  images: string[];
}

interface ProductState {
  products: Product[];
  product: Product | null;
  categories: string[];
  total: number;
  loading: boolean;

  // Unified Action
  fetchProducts: (limit: number, skip: number, search?: string, category?: string) => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchProductById: (id: number) => Promise<void>;
  resetProduct: () => void;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  product: null,
  categories: [],
  total: 0,
  loading: false,

  fetchProducts: async (limit, skip, search = '', category = '') => {
    set({ loading: true });
    try {
      const data = await productService.getAll(limit, skip, search, category);
      
      set({
        products: data.products,
        total: data.total,
        loading: false,
      });
    } catch (error) {
      console.error('Fetch products error:', error);
      set({ loading: false, products: [], total: 0 });
    }
  },

  fetchCategories: async () => {
    if (get().categories.length > 0) return;
    try {
      const data = await productService.getCategories();
      const normalized = data.map((cat: any) =>
        typeof cat === 'string' ? cat : (cat.slug || cat.name)
      );
      set({ categories: normalized });
    } catch (error) {
      console.error('Failed to fetch categories');
    }
  },

  fetchProductById: async (id) => {
    const cachedProduct = get().products.find((p) => p.id === id);
    if (cachedProduct) {
      set({ product: cachedProduct });
      return;
    }

    set({ loading: true, product: null });
    try {
      const data = await productService.getById(id);
      set({ product: data, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },

  resetProduct: () => set({ product: null }),
}));