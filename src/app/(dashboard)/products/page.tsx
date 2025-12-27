'use client';
import { useEffect, useState } from 'react';
import { useProductStore } from '@/store/useProductStore';
import { useDebounce } from '@/hooks/useDebounce';
import ProductCard from '@/components/products/ProductCard';
import Pagination from '@/components/common/Pagination';
import {
    Typography, Select, MenuItem, FormControl, InputLabel,
    Box, TextField, Paper, CircularProgress, Stack, InputAdornment
} from '@mui/material';
import { Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

export default function ProductsPage() {
    const {
        products, total, categories, loading,
        fetchProducts, fetchCategories
    } = useProductStore();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(12);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');

    const debouncedSearch = useDebounce(searchTerm, 500);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    useEffect(() => {
        fetchProducts(rowsPerPage, page * rowsPerPage, debouncedSearch, category);
    }, [debouncedSearch, category, page, rowsPerPage, fetchProducts]);

    return (
        <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 'xl', mx: 'auto', bgcolor: 'white' }}>
            <Stack spacing={4}>
                {/* Header Section */}
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { md: 'flex-end' }, gap: 3 }}>
                    <Box>
                        <Typography variant="h3" sx={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
                            Products
                        </Typography>
                    </Box>

                    <Paper elevation={0} sx={{ p: 1, backgroundColor: 'white', borderRadius: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                        <TextField
                            size="small"
                            placeholder="Search items..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setPage(0); // Reset pagination on search
                            }}
                            sx={{ bgcolor: 'white', borderRadius: 2, width: { xs: '100%', sm: 250 } }}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>,
                            }}
                        />

                        <FormControl size="small" sx={{ minWidth: 180, bgcolor: 'white' }}>
                            <InputLabel><Stack direction="row" alignItems="center" gap={1}><FilterListIcon fontSize="inherit" /> Category</Stack></InputLabel>
                            <Select
                                label="Category"
                                value={category}
                                onChange={(e) => {
                                    setCategory(e.target.value);
                                    setPage(0); // Reset pagination on filter
                                }}
                            >
                                <MenuItem value="">All Products</MenuItem>
                                {categories.map((cat) => (
                                    <MenuItem key={cat} value={cat} sx={{ textTransform: 'capitalize' }}>
                                        {cat.replace('-', ' ')}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Paper>
                </Box>

                {/* Product Grid */}
                {loading ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 15, gap: 2 }}>
                        <CircularProgress thickness={4} size={50} />
                        <Typography color="text.secondary" variant="body2" sx={{ fontWeight: 500 }}>Loading items...</Typography>
                    </Box>
                ) : (
                    <>
                        <Grid container spacing={3}>
                            {products.map((product) => (
                                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
                                    <ProductCard product={product} />
                                </Grid>
                            ))}
                        </Grid>

                        {products.length === 0 && (
                            <Paper sx={{ textAlign: 'center', py: 10, borderRadius: 4, border: '1px dashed #ccc' }} elevation={0}>
                                <Typography variant="h6" color="text.secondary">No products found matching your criteria.</Typography>
                                <Typography variant="body2" color="text.disabled">Try adjusting your filters or search terms.</Typography>
                            </Paper>
                        )}
                    </>
                )}

                {/* Pagination Wrapper */}
                <Box sx={{ display: 'flex', justifyContent: 'center', pt: 4 }}>
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
            </Stack>
        </Box>
    );
}