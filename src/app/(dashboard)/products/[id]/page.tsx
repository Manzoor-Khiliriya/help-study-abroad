'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    Box, Button, Typography, Paper, Rating,
    Chip, CircularProgress, Stack, Container, Divider
} from '@mui/material';
import { Grid } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useProductStore } from '@/store/useProductStore';
import Image from 'next/image';

export default function ProductDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const { product, fetchProductById, loading } = useProductStore();
    const [activeImg, setActiveImg] = useState<string | null>(null);

    useEffect(() => {
        if (id) fetchProductById(Number(id));
    }, [id, fetchProductById]);

    useEffect(() => {
        if (product) setActiveImg(product.thumbnail || product.images[0]);
    }, [product]);

    if (loading || !product) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <CircularProgress thickness={4} size={50} />
            </Box>
        );
    }

    return (
        <Container sx={{ py: { xs: 2, md: 8 }, maxWidth: 1000, mx: 'auto' }}>
            <Button
                startIcon={<ArrowBackIcon />}
                sx={{ mb: 3, borderRadius: 2, textTransform: 'none' }}
                onClick={() => router.push('/products')}
            >
                Back to Products
            </Button>

            <Grid container spacing={{ xs: 4, md: 8 }}>
                {/* Left Side: Image Gallery */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Stack spacing={2}>
                        <Paper
                            elevation={0}
                            sx={{
                                position: 'relative',
                                height: { xs: 350, md: 550 },
                                width: '100%',
                                bgcolor: '#fdfdfd',
                                borderRadius: 6,
                                overflow: 'hidden',
                                border: '1px solid #f0f0f0',
                                transition: '0.3s',
                                '&:hover': { boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }
                            }}
                        >
                            {activeImg && (
                                <Image
                                    src={activeImg}
                                    alt={product.title}
                                    fill
                                    priority
                                    style={{ objectFit: 'contain', padding: '32px' }}
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            )}
                        </Paper>

                        {/* Thumbnails */}
                        <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', py: 1, px: 0.5, borderRadius: 2 }}>
                            {product.images.map((img, i) => (
                                <Box
                                    key={i}
                                    onClick={() => setActiveImg(img)}
                                    sx={{
                                        position: 'relative',
                                        width: 80,
                                        height: 80,
                                        bgcolor: '#fafafa',
                                        flexShrink: 0,
                                        borderRadius: 3,
                                        cursor: 'pointer',
                                        overflow: 'hidden',
                                        transition: 'all 0.2s ease-in-out',
                                        border: '2px solid',
                                        borderColor: activeImg === img ? 'primary.main' : 'transparent',
                                        transform: activeImg === img ? 'scale(1.05)' : 'scale(1)',
                                        boxShadow: activeImg === img ? '0 8px 16px rgba(0,0,0,0.1)' : 'none',
                                    }}
                                >
                                    <Image src={img} alt="thumb" fill style={{ objectFit: 'cover' }} />
                                </Box>
                            ))}
                        </Box>
                    </Stack>
                </Grid>

                {/* Right Side: Product Info */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Stack spacing={3}>
                        <Box>
                            <Chip
                                label={product.category.toUpperCase()}
                                size="small"
                                sx={{ fontWeight: 700, letterSpacing: 1, bgcolor: '#fcfcfcff', mb: 2 }}
                            />
                            <Typography variant="h2" sx={{ fontWeight: 800, mb: 1, fontSize: { xs: '2rem', md: '3rem' } }}>
                                {product.title}
                            </Typography>

                            <Stack direction="row" alignItems="center" spacing={1.5}>
                                <Rating value={product.rating} readOnly precision={0.5} size="small" />
                                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                                    {product.rating} Reviews
                                </Typography>
                            </Stack>
                        </Box>

                        <Typography variant="h3" color="primary" sx={{ fontWeight: 700 }}>
                            ${product.price.toLocaleString()}
                        </Typography>

                        <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8, fontSize: '1.1rem' }}>
                            {product.description}
                        </Typography>

                        <Stack direction="row" spacing={2}>
                            <Button
                                variant="contained"
                                size="large"
                                startIcon={<ShoppingCartIcon />}
                                sx={{
                                    borderRadius: 4,
                                    px: 4,
                                    py: 1.5,
                                    textTransform: 'none',
                                    fontSize: '1.1rem',
                                    boxShadow: '0 10px 20px rgba(25, 118, 210, 0.3)'
                                }}
                            >
                                Add to Cart
                            </Button>
                            <Chip
                                label={product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                color={product.stock > 0 ? 'success' : 'error'}
                                variant="outlined"
                                sx={{ height: 'auto', px: 2, fontWeight: 700 }}
                            />
                        </Stack>

                        <Divider sx={{ my: 2 }} />

                        {/* Details Grid */}
                        <Paper
                            variant="outlined"
                            sx={{
                                p: 3,
                                borderRadius: 4,
                                bgcolor: '#fafafa',
                                border: '1px solid #eee'
                            }}
                        >
                            <Grid container spacing={3}>
                                <Grid size={{ xs: 6 }}>
                                    <Typography variant="caption" color="text.disabled" sx={{ fontWeight: 700, textTransform: 'uppercase' }}>
                                        Brand
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                        {product.brand || 'Generic'}
                                    </Typography>
                                </Grid>
                                <Grid size={{ xs: 6 }}>
                                    <Typography variant="caption" color="text.disabled" sx={{ fontWeight: 700, textTransform: 'uppercase' }}>
                                        SKU Identifier
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                        {product.sku}
                                    </Typography>
                                </Grid>
                                <Grid size={{ xs: 6 }}>
                                    <Typography variant="caption" color="text.disabled" sx={{ fontWeight: 700, textTransform: 'uppercase' }}>
                                        Weight
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                        {product.weight}g
                                    </Typography>
                                </Grid>
                                <Grid size={{ xs: 6 }}>
                                    <Typography variant="caption" color="text.disabled" sx={{ fontWeight: 700, textTransform: 'uppercase' }}>
                                        Stock Level
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                        {product.stock} units
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    );
}