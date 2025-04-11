import React, { useState, useEffect, FC } from "react";
import { Button, TextField, Typography, Box, CircularProgress, IconButton } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import toast from "react-hot-toast";
import AllReviews from "./AllReviews";
import Review from "./Review";

interface ReviewType {
  id?: string;
  userId: string;
  productId: string;
  rating: number;
  comment: string;
  user?: {
    name: string;
    email: string;
    profile?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

interface ProductReviewFormProps {
  product: { id: string };
  productReviews: ReviewType[];
  userId: string | null;
  userData: {
    name: string;
    email: string;
    profile?: string;
    role: string;
  } | null;
}

const ProductReviewForm: FC<ProductReviewFormProps> = ({
  product,
  productReviews = [],
  userId = null,
  userData = null,
}) => {
  const [reviews, setReviews] = useState<ReviewType[]>(productReviews);
  const [userReviewed, setUserReviewed] = useState<boolean>(false);
  const [usersReview, setUsersReview] = useState<ReviewType[]>([]);
  const [formInput, setFormInput] = useState<{ rating: number; comment: string }>({
    rating: 0,
    comment: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (userId) {
      const userReview = productReviews.find((review) => review.userId === userId);
      if (userReview) {
        setUserReviewed(true);
        setUsersReview([userReview]);
      }
    }
  }, [userId, productReviews]);

  const handleRatingClick = (rating: number) => {
    setFormInput((prev) => ({ ...prev, rating }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formInput.rating || !formInput.comment) {
      toast.error("Please provide both rating and comment.");
      return;
    }

    if (userData?.role === "ADMIN" || userData?.role === "VENDOR") {
      toast.error("Only customers can add reviews.");
      return;
    }

    setLoading(true);

    const newReview: ReviewType = {
      rating: formInput.rating,
      comment: formInput.comment,
      productId: product.id,
      userId: userId!,
    };

    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${baseUrl}/api/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReview),
      });

      const responseData = await response.json();

      if (response.ok) {
        toast.success("Review submitted successfully.");
        newReview.user = {
          name: userData!.name,
          email: userData!.email,
          profile: userData?.profile,
        };
        newReview.createdAt = new Date().toISOString();
        newReview.updatedAt = new Date().toISOString();
        setUsersReview([newReview]);
        setReviews((prev) => [...prev, newReview]);
        setUserReviewed(true);
      } else {
        if (response.status === 409) {
          toast.error(responseData.message);
        } else {
          toast.error("Something went wrong.");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred.");
    } finally {
      setLoading(false);
      setFormInput({ rating: 0, comment: "" });
    }
  };

  return (
    <div className="bg-light py-5 my-4 rounded">
      <AllReviews reviews={reviews} />
      {userId && !userReviewed ? (
        <form onSubmit={handleSubmit} className="container bg-white shadow p-4 rounded mt-4">
          <Typography variant="h5" gutterBottom color="primary">
            Write a Review
          </Typography>

          <Box mb={2}>
            <Typography>Rating:</Typography>
            <Box display="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  filled={star <= formInput.rating}
                  onClick={() => handleRatingClick(star)}
                />
              ))}
            </Box>
          </Box>

          <Box mb={2}>
            <TextField
              label="Your Review"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              value={formInput.comment}
              onChange={(e) => setFormInput({ ...formInput, comment: e.target.value })}
            />
          </Box>

          <Box textAlign="right">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
              endIcon={loading && <CircularProgress size={20} />}
            >
              {loading ? "Submitting..." : "Submit Review"}
            </Button>
          </Box>
        </form>
      ) : (
        <div className="container bg-white shadow p-4 rounded mt-4">
          {userId ? (
            <>
              <Typography variant="h6" color="primary" className="text-center mb-3">
                Your Review
              </Typography>
              {usersReview.map((review) => (
                <Review key={review.id} review={review} />
              ))}
            </>
          ) : (
            <Box textAlign="center">
              <Button variant="contained" color="primary" href="/login">
                Login to add review
              </Button>
            </Box>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductReviewForm;

interface StarProps {
  filled: boolean;
  onClick: () => void;
}

const Star: FC<StarProps> = ({ filled, onClick }) => (
  <IconButton onClick={onClick} color={filled ? "primary" : "default"}>
    <StarIcon />
  </IconButton>
);
