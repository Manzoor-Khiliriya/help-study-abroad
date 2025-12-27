'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Box, CircularProgress } from '@mui/material';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, _hasHydrated } = useAuthStore();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Only redirect if:
    // 1. We are on the client side
    // 2. Zustand has finished loading from localStorage (_hasHydrated)
    // 3. The user is still not authenticated
    if (isClient && _hasHydrated && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isClient, _hasHydrated, isAuthenticated, router]);

  // While waiting for the store to hydrate or checking auth, show a loader
  // This prevents the "flash" of empty content
  if (!isClient || !_hasHydrated) {
    return (
      <Box sx={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  // If we've hydrated and are not authenticated, the useEffect above will redirect.
  // We return null here to avoid rendering the Navbar/Footer for a split second.
  if (!isAuthenticated) return null;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
}