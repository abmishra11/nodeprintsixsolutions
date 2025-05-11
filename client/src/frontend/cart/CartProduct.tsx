import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Grid,
  Box,
  Typography,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { Delete, Add, Remove } from '@mui/icons-material';
import toast from 'react-hot-toast';
import {
  removeFromCart,
  updateQuantity,
} from '../../redux/reducer/cart';
import { CartItem } from '../../types/cart';
import {
  useDeleteCartItemMutation,
  useUpdateCartItemMutation,
} from '../../redux/services/cart';

interface Props {
  cartItem: CartItem;
}

const CartProduct: React.FC<Props> = ({ cartItem }) => {
  console.log('cartItem', cartItem);
  
  const dispatch = useDispatch();
  const [deleteCartItem] = useDeleteCartItemMutation();
  const [updateCartItem] = useUpdateCartItemMutation();

  const [isUpdating, setIsUpdating] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleCartItemDelete = async (productId: string) => {
    try {
      setIsDeleting(true);
      await deleteCartItem(productId).unwrap();
      dispatch(removeFromCart(id));
      toast.success('Item removed successfully');
    } catch {
      toast.error('Failed to remove item');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCartQuantity = async (
    productId: string,
    updatedQuantity: number
  ) => {
    if (updatedQuantity < 1) return;

    try {
      setIsUpdating(true);
      await updateCartItem({ productId, updatedData: { quantity: updatedQuantity } }).unwrap();
      dispatch(updateQuantity({ id, quantity: updatedQuantity }));
    } catch {
      toast.error('Failed to update quantity');
    } finally {
      setIsUpdating(false);
    }
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

        <Grid
          item
          xs={12}
          md={6}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box
            display="flex"
            alignItems="center"
            border="1px solid #ccc"
            borderRadius="12px"
          >
            <IconButton
              onClick={() =>
                handleCartQuantity(cartItem.productId, Number(cartItem.quantity) - 1)
              }
              aria-label="decrease"
              disabled={cartItem.quantity <= 1 || isUpdating}
            >
              <Remove />
            </IconButton>
            <Typography variant="body2" sx={{ px: 2 }}>
              {isUpdating ? '...' : cartItem.quantity}
            </Typography>
            <IconButton
              onClick={() =>
                handleCartQuantity(cartItem.productId, Number(cartItem.quantity) + 1)
              }
              aria-label="increase"
              disabled={isUpdating}
            >
              <Add />
            </IconButton>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="body1">${cartItem.salePrice}</Typography>
            <IconButton
              onClick={() => handleCartItemDelete(cartItem.productId)}
              aria-label="delete"
              color="primary"
              disabled={isDeleting}
            >
              {isDeleting ? <CircularProgress size={20} /> : <Delete />}
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CartProduct;
