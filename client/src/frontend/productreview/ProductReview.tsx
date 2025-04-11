import React from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { AiOutlineStar } from 'react-icons/ai';
import { Box } from '@mui/material';

interface ProductReviewProps {
  stars: number;
  reviews?: number; // Optional if needed elsewhere
}

const ProductReview: React.FC<ProductReviewProps> = ({ stars }) => {
  const ratingStar = Array.from({ length: 5 }, (_, index) => {
    const number = index + 0.5;
    return (
      <span key={index}>
        {stars >= index + 1 ? (
          <FaStar />
        ) : stars >= number ? (
          <FaStarHalfAlt />
        ) : (
          <AiOutlineStar />
        )}
      </span>
    );
  });

  return (
    <Box 
      display="flex" 
      alignItems="center" 
      sx={{ color: '#facc15', fontSize: '1.25rem' }} // Tailwind "text-yellow-400 text-xl"
      className="d-flex align-items-center"
    >
      {ratingStar}
    </Box>
  );
};

export default ProductReview;
