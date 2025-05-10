import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Container, Box } from '@mui/material';

const EmptyCart: React.FC = () => {
  return (
    <Container
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box textAlign="center">
        <Typography variant="h5" component="p">
          Your Cart is Empty{' '}
          <Link to="/" className="text-primary">
            Start Shopping
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default EmptyCart;
