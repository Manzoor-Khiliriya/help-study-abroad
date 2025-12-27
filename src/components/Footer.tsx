'use client';
import { Box, Typography, Container, Divider } from '@mui/material';

export default function Footer() {
  return (
    <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: 'white' }}>
      <Divider sx={{ mb: 2 }} />
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} Help Study Abroad Frontend Assessment.
        </Typography>
        <Typography variant="caption" color="text.disabled" align="center" display="block">
          Built with Next.js, MUI, and Zustand.
        </Typography>
      </Container>
    </Box>
  );
}