import React from 'react';
import { useDispatch } from 'react-redux';
import { Grid, Box, Typography, IconButton } from '@mui/material';
import { Delete, Add, Remove } from '@mui/icons-material';
import toast from 'react-hot-toast';
import { removeFromCart, updateQuantity, clearCart } from "../../redux/reducer/cart";

type CartItemType = {
  id: string;
  title: string;
  imageUrl: string;
  salePrice: number;
  qty: number;
};

interface Props {
  cartItem: CartItemType;
}

const CartProduct: React.FC<Props> = ({ cartItem }) => {
  const dispatch = useDispatch();

  const handleCartItemDelete = (cartId: string) => {
    dispatch(removeFromCart(cartId));
    toast.success('Item removed successfully');
  };

  const handleQtyIncrement = (cartId: string) => {
    dispatch(updateQuantity(cartId));
  };

  const handleQtyDecrement = (cartId: string) => {
    dispatch(updateQuantity(cartId));
  };

  return (
    <Box
      sx={{
        borderBottom: '1px solid #ccc',
        paddingBottom: 2,
        marginBottom: 2,
        fontWeight: 600,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} display="flex" alignItems="center" gap={2}>
          <img
            src={cartItem.imageUrl}
            alt={cartItem.title}
            width={80}
            height={80}
            style={{ borderRadius: '12px', objectFit: 'cover' }}
          />
          <Typography variant="body1">{cartItem.title}</Typography>
        </Grid>

        <Grid item xs={12} md={6} display="flex" justifyContent="space-between" alignItems="center">
          <Box
            display="flex"
            alignItems="center"
            border="1px solid #ccc"
            borderRadius="12px"
          >
            <IconButton onClick={() => handleQtyDecrement(cartItem.id)} aria-label="decrease">
              <Remove />
            </IconButton>
            <Typography variant="body2" sx={{ px: 2 }}>
              {cartItem.qty}
            </Typography>
            <IconButton onClick={() => handleQtyIncrement(cartItem.id)} aria-label="increase">
              <Add />
            </IconButton>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="body1">${cartItem.salePrice}</Typography>
            <IconButton onClick={() => handleCartItemDelete(cartItem.id)} aria-label="delete" color="primary">
              <Delete />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CartProduct;
