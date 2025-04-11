import React from "react";
import { Box, Grid, Typography, Avatar } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ProductReview from "./ProductReview"; // Assumes this is already compatible
import { getFormattedDateAndTime } from "../lib/getFormatedDateAndTime"; // Adjust path if needed

interface Review {
  rating: number;
  comment: string;
  createdAt: string;
  product?: {
    imageUrl: string;
    title: string;
    productPrice: number;
    salePrice: number;
  };
  user?: {
    name: string;
    profile?: {
      profileImageUrl?: string;
    };
  };
}

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <Box className="px-5 py-4">
      {/* Product Detail */}
      <Box bgcolor="#1e293b" color="white" p={4} borderRadius={2}>
        <Typography variant="h5" align="center" gutterBottom>
          Product Detail
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <img
              src={review.product?.imageUrl}
              alt={review.product?.title}
              style={{ width: "100%", borderRadius: "8px" }}
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <Typography variant="body1" gutterBottom>
              {review.product?.title}
            </Typography>
            <Typography variant="body2">
              Product Price: ${review.product?.productPrice}
            </Typography>
            <Typography variant="body2">
              Sale Price: ${review.product?.salePrice}
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Review Detail */}
      <Box bgcolor="#1e293b" color="white" p={4} mt={4} borderRadius={2}>
        <Typography variant="h5" align="center" gutterBottom>
          Review Detail
        </Typography>

        <Box display="flex" alignItems="center">
          {review.user?.profile?.profileImageUrl ? (
            <Avatar
              src={review.user.profile.profileImageUrl}
              alt="User"
              sx={{ width: 64, height: 64, mr: 2 }}
            />
          ) : (
            <AccountCircleIcon sx={{ fontSize: 64, mr: 2 }} />
          )}
          <Typography variant="body1">{review.user?.name}</Typography>
        </Box>

        <Box mt={3}>
          <ProductReview stars={review.rating} reviews={1} />
          <Typography variant="body2" mt={2}>
            {getFormattedDateAndTime(review.createdAt)}
          </Typography>
        </Box>

        <Box mt={3}>
          <Typography variant="body2">{review.comment}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ReviewCard;
