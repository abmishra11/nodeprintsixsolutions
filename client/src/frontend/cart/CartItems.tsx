import React from 'react';
import { Box, Typography, TextField, Button, Grid, Divider } from '@mui/material';
import CartProduct from './CartProduct';
import EmptyCart from './EmptyCart';

interface CartItem {
  // Define according to your data structure
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface CartItemsProps {
  cartItems: CartItem[];
}

const CartItems: React.FC<CartItemsProps> = ({ cartItems }) => {
  return (
    <Box sx={{ padding: 2 }}>
      {cartItems.length > 0 && (
        <>
          <Typography variant="h6" gutterBottom>
            Your Cart
          </Typography>
          <Grid container justifyContent="space-between" alignItems="center">
            {/* Uncomment and customize these headers if needed */}
            {/* <Typography variant="subtitle2">Product</Typography>
            <Typography variant="subtitle2">Quantity</Typography>
            <Typography variant="subtitle2">Price</Typography> */}
          </Grid>
          <Divider sx={{ my: 2 }} />
        </>
      )}

      <Box>
        {cartItems.length > 0 ? (
          cartItems.map((item, i) => (
            <CartProduct key={i} cartItem={item} />
          ))
        ) : (
          <EmptyCart />
        )}
      </Box>

      {/* Coupon Form */}
      <Grid container spacing={2} alignItems="center" sx={{ mt: 4 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            variant="outlined"
            label="Enter coupon code"
            placeholder="name@flowbite.com"
          />
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary">
            Apply Coupon
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CartItems;
