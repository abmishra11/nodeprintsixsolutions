import React from "react";
import { AccountCircle } from "@mui/icons-material";
import { Box, Typography, Avatar } from "@mui/material";
import ProductReview from "./ProductReview";
import { getFormattedDateAndTime } from "../../utils/getFormattedDateAndTime";

interface ReviewProps {
  review: {
    user?: {
      name?: string;
      profile?: {
        profileImageUrl?: string;
      };
    };
    rating: number;
    comment: string;
    createdAt: string;
  };
}

const Review: React.FC<{ review: ReviewProps["review"] }> = ({ review }) => {
  return (
    <Box>
      <Box className="d-flex align-items-center">
        {review.user?.profile?.profileImageUrl ? (
          <Avatar
            alt="User"
            src={review.user.profile.profileImageUrl}
            sx={{ width: 50, height: 50, marginRight: 2 }}
          />
        ) : (
          <AccountCircle sx={{ fontSize: 50, color: "primary.main", marginRight: 2 }} />
        )}
        <Box>
          <Typography variant="subtitle1" color="primary">
            {review.user?.name}
          </Typography>
        </Box>
      </Box>

      <Box className="d-flex justify-content-between mt-3">
        <ProductReview stars={review.rating} reviews={1} />
        <Typography variant="body2" color="primary">
          {getFormattedDateAndTime(review.createdAt)}
        </Typography>
      </Box>

      <Box className="mt-3">
        <Typography variant="body1" color="textPrimary">
          {review.comment}
        </Typography>
      </Box>
    </Box>
  );
};

export default Review;
