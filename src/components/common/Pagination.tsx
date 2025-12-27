import { TablePagination as MuiPagination, Box } from '@mui/material';

interface PaginationProps {
  total: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newRowsPerPage: number) => void;
}

export default function Pagination({
  total,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}: PaginationProps) {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: { xs: 'center', sm: 'flex-end' },
        borderTop: '1px solid',
        borderColor: 'divider',
        mt: 2,
        // Overrided internal MUI classes for mobile responsiveness
        '& .MuiTablePagination-toolbar': {
          flexWrap: 'wrap',
          justifyContent: 'center',
          p: { xs: 1, sm: 2 },
        },
        '& .MuiTablePagination-spacer': {
          display: { xs: 'none', sm: 'block' },
        },
        '& .MuiTablePagination-selectLabel, & .MuiTablePagination-input': {
          my: { xs: 1, sm: 0 },
        },
      }}
    >
      <MuiPagination
        component="div"
        count={total}
        page={page}
        onPageChange={(_, p) => onPageChange(p)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => onRowsPerPageChange(parseInt(e.target.value, 10))}
        rowsPerPageOptions={[5, 10, 25]}
        sx={{
          border: 'none'
        }}
      />
    </Box>
  );
}