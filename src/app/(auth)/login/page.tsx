'use client';

import { useState } from 'react';
import { 
  Box, Container, Paper, Typography, TextField, 
  Button, Alert, CircularProgress 
} from '@mui/material';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  
  const [username, setUsername] = useState('emilys'); // Default dummyjson user
  const [password, setPassword] = useState('emilyspass');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await login(username, password);

    if (result.success) {
      router.push('/users'); // Redirect to dashboard
    } else {
      setError(result.message || 'Login failed. Check your credentials.');
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="xs">
      <Box 
        sx={{ 
          marginTop: 15, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center' 
        }}
      >
        <Paper 
          elevation={6} 
          sx={{ p: 4, width: '100%', borderRadius: 3 }}
        >
          <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
            Admin Login
          </Typography>
          <Typography variant="body2" align="center" color="textSecondary" sx={{ mb: 3 }}>
            Sign in to manage users and products
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              margin="normal"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, mb: 2, py: 1.5, fontWeight: 'bold' }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}