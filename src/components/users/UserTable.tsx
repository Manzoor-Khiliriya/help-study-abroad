import { 
  Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Box, CircularProgress 
} from '@mui/material';
import Link from 'next/link';

interface UserTableProps {
  users: any[];
  loading: boolean;
}

export default function UserTable({ users, loading }: UserTableProps) {
  const columns = ['Name', 'Email', 'Gender', 'Phone', 'Company'];

  return (
    <TableContainer sx={{ minHeight: 400, position: 'relative', border: '1px solid #eee', borderRadius: 1 }}>
      {loading && (
        <Box sx={{ 
          position: 'absolute', inset: 0, display: 'flex', 
          justifyContent: 'center', alignItems: 'center', 
          bgcolor: 'rgba(255,255,255,0.7)', zIndex: 2 
        }}>
          <CircularProgress />
        </Box>
      )}

      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col} sx={{ fontWeight: 'bold', bgcolor: '#f8f9fa' }}>
                {col}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} hover>
              <TableCell>
                <Link 
                  href={`/users/${user.id}`} 
                  style={{ textDecoration: 'none', color: '#1976d2', fontWeight: 500 }}
                >
                  {user.firstName} {user.lastName}
                </Link>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell sx={{ textTransform: 'capitalize' }}>{user.gender}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.company?.name}</TableCell>
            </TableRow>
          ))}
          {!loading && users.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                No users found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}