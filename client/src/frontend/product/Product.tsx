import React from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardContent, CardMedia, Typography, Button, IconButton, Box } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';
// import { addToCart } from '../redux/slices/cartSlice'; // Adjust path accordingly
import toast from 'react-hot-toast';

interface ProductProps {
  product: {
    slug: string;
    title: string;
    imageUrl: string;
    salePrice: number;
    productPrice: number;
    category?: {
      title: string;
      slug: string;
    };
    reviews?: number;
  };
}

const Product: React.FC<{ product: ProductProps['product'] }> = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    // dispatch(addToCart(product));
    toast.success('Product added to cart!');
  };

  return (
    <Card className="shadow-sm rounded overflow-hidden">
      <a href={`/products/${product.slug}`} style={{ textDecoration: 'none' }}>
        <CardMedia
          component="img"
          height="200"
          image={product.imageUrl}
          alt={product.title}
          className="object-cover"
        />
      </a>

      <CardContent>
        <Typography variant="h6" color="primary" className="mb-2">
          <a href={`/products/${product.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            {product.title}
          </a>
        </Typography>

        {product.category && (
          <Typography variant="body2" color="textSecondary">
            Category:{" "}
            <a href={`/category/${product.category.slug}`} style={{ color: '#1976d2' }}>
              {product.category.title}
            </a>
          </Typography>
        )}

        <Box className="d-flex align-items-baseline mt-2 mb-2">
          <Typography variant="h6" color="primary" className="me-2">
            ${product.salePrice}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ textDecoration: 'line-through' }}>
            ${product.productPrice}
          </Typography>
        </Box>

        <Box className="mb-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <StarIcon
              key={index}
              fontSize="small"
              color={index < (product.reviews || 0) ? 'warning' : 'disabled'}
            />
          ))}
        </Box>

        <Box className="d-flex justify-content-between align-items-center">
          <Button variant="contained" color="primary" onClick={handleAddToCart}>
            Add to Cart
          </Button>
          <Box>
            <IconButton>
              <SearchIcon />
            </IconButton>
            <IconButton>
              <FavoriteBorderIcon />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Product;
