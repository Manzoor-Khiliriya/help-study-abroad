'use client';
import { AppBar, Toolbar, Typography, Button, Box, Tabs, Tab, Avatar, Container } from '@mui/material';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  const currentTab = pathname.startsWith('/products') ? 1 : 0;

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    if (newValue === 0) router.push('/users');
    if (newValue === 1) router.push('/products');
  };

  return (
    <AppBar position="sticky" color="default" elevation={1} sx={{ bgcolor: 'white' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, fontWeight: 'bold', color: 'primary.main', cursor: 'pointer' }}
            onClick={() => router.push('/')}
          >
            STUDY ADMIN
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' } }}>
              {user?.firstName} {user?.lastName}
            </Typography>
            <Avatar src={user?.image} alt="User profile" sx={{ width: 35, height: 35 }} />
            <Button variant="outlined" color="error" size="small" onClick={logout}>
              Logout
            </Button>
          </Box>
        </Toolbar>
        
        <Tabs value={currentTab} onChange={handleTabChange} indicatorColor="primary" textColor="primary">
          <Tab label="Users" />
          <Tab label="Products" />
        </Tabs>
      </Container>
    </AppBar>
  );
}