import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import ProductReview from './ProductReview';
import Review from './Review';

interface ReviewType {
  id: string | number;
  rating: number;
  [key: string]: any; // in case there are more fields
}

interface AllReviewsProps {
  reviews: ReviewType[];
}

const AllReviews: React.FC<AllReviewsProps> = ({ reviews }) => {
  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length || 0;

  return (
    <Box>
      {/* Review Summary */}
      <Paper elevation={3} className="container mb-4 p-4">
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h5" color="primary" fontWeight="bold">
            Over All Rating
          </Typography>
          {reviews.length === 0 ? (
            <Typography variant="h5" color="primary" fontWeight="bold">
              No reviews yet
            </Typography>
          ) : (
            <ProductReview stars={averageRating} reviews={reviews.length} />
          )}
        </Grid>
      </Paper>

      {/* Customer Reviews */}
      {reviews.length > 0 && (
        <Paper
          elevation={3}
          className="container p-4"
          sx={{ maxHeight: 400, overflow: 'auto' }}
        >
          <Box textAlign="center" mb={2}>
            <Typography variant="h5" color="primary" fontWeight="bold">
              Customer's Reviews
            </Typography>
          </Box>
          {reviews.map((review) => (
            <Box key={review.id} mt={2}>
              <Review review={review} />
            </Box>
          ))}
        </Paper>
      )}
    </Box>
  );
};

export default AllReviews;
