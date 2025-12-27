const BASE_URL = 'https://dummyjson.com';

export const apiClient = async (endpoint: string, options: RequestInit = {}) => {
  const authStorage = typeof window !== 'undefined' ? localStorage.getItem('auth-storage') : null;
  const token = authStorage ? JSON.parse(authStorage).state.token : null;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });

  if (response.status === 401) {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('auth-storage');
        window.location.href = '/login';
    }
  }

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'API Request Failed');
  }

  return response.json();
};