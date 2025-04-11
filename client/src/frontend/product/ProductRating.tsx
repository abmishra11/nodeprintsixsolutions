import React from 'react';
import Typography from '@mui/material/Typography';
import ProductReview from '../productreview/ProductReview';

interface Review {
  rating: number;
  // Add more fields if needed
}

interface ProductRatingProps {
  reviews: Review[];
}

const ProductRating: React.FC<ProductRatingProps> = ({ reviews }) => {
  const ratingCount = reviews?.length || 0;
  const averageRating =
    reviews?.reduce((acc, review) => acc + (review?.rating || 0), 0) /
      (ratingCount || 1);

  return (
    <div className="d-flex align-items-center">
      <ProductReview stars={averageRating} reviews={ratingCount} />
      <Typography variant="body2" className="text-muted ms-3">
        ({ratingCount} {ratingCount === 1 || ratingCount === 0 ? 'Review' : 'Reviews'})
      </Typography>
    </div>
  );
};

export default ProductRating;
