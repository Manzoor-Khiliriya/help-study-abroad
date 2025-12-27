import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, Typography, Box } from '@mui/material';

interface ProductCardProps {
  product: any;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
      <Card sx={{ 
        height: '100%', display: 'flex', flexDirection: 'column', 
        transition: '0.2s', '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 } 
      }}>
        <Box sx={{ position: 'relative', height: 180, width: '100%', bgcolor: '#f5f5f5', p: 1 }}>
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            style={{ objectFit: 'contain', padding: '8px' }}
          />
        </Box>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle1" noWrap sx={{ fontWeight: 'bold' }}>
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {product.category}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
            <Typography variant="h6" color="primary.main">${product.price}</Typography>
            <Typography variant="caption">⭐ {product.rating}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
}