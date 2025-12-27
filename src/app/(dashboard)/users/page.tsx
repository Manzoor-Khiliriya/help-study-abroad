'use client';
import { useEffect, useState } from 'react';
import { useUserStore } from '@/store/useUserStore';
import { useDebounce } from '@/hooks/useDebounce';
import UserTable from '@/components/users/UserTable';
import Pagination from '@/components/common/Pagination';
import { Paper, Typography, TextField, Box, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function UsersPage() {
  const { users, total, loading, fetchUsers } = useUserStore();
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  
  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    fetchUsers(rowsPerPage, page * rowsPerPage, debouncedSearch);
  }, [debouncedSearch, page, rowsPerPage, fetchUsers]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(0);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 'xl', mx: 'auto' }}>
      <Paper 
        elevation={0} 
        sx={{ 
          p: { xs: 2, md: 3 }, 
          borderRadius: 4, 
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, 
          justifyContent: 'space-between', 
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: 2,
          mb: 4 
        }}>
          <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
            Users
          </Typography>

          <TextField
            placeholder="Search by name, email..."
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ 
              width: { xs: '100%', sm: 300 },
              '& .MuiOutlinedInput-root': { borderRadius: 3 }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <UserTable users={users} loading={loading} />

        <Box sx={{ mt: 2 }}>
          <Pagination
            total={total}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={setPage}
            onRowsPerPageChange={(rows) => {
              setRowsPerPage(rows);
              setPage(0);
            }}
          />
        </Box>
      </Paper>
    </Box>
  );
}