'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { Box, CircularProgress } from '@mui/material';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    // Check if user is authenticated and redirect accordingly
    if (isAuthenticated) {
      router.replace('/users');
    } else {
      router.replace('/login');
    }
  }, [isAuthenticated, router]);

  return (
    <Box 
      sx={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}
    >
      <CircularProgress />
    </Box>
  );
}