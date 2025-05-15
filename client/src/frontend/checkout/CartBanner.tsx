import React from "react";
import { useSelector } from "react-redux";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Link } from "react-router-dom";
import { Box, Typography, Button, Avatar, Stack } from "@mui/material";
import { useCartItems } from "../../hooks/useCartItems";

export default function CartBanner() {
  const user = useSelector((state: RootState) => state.auth);
  const isAuthenticated = !!user?.userId;

  const {
    cartItems,
    isCartLoading,
    cartError,
  } = useCartItems(isAuthenticated);
  console.log('cartItems', cartItems);
  
  const subTotal = cartItems
  .reduce((acc, item) => acc + (item.salePrice || 0) * (item.quantity || 0), 0)
  .toFixed(2);

  return (
    <Box className="bg-light rounded mb-4 p-3">
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center">
        <Stack direction="row" spacing={2} alignItems="center" className="flex-grow-1">
          <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
            <ShoppingBagIcon />
          </Avatar>
          <Typography variant="body1" color="primary">
            You have {cartItems.length} items in cart. Subtotal is{" "}
            <Typography component="span" fontWeight="bold" color="primary">
              ${subTotal}
            </Typography>
          </Typography>
        </Stack>
        <div className="mt-3 mt-sm-0">
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/cart"
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              '&:hover': {
                backgroundColor: 'white',
                color: 'primary.main',
                border: '1px solid #ccc',
              },
            }}
          >
            Edit cart
          </Button>
        </div>
      </div>
    </Box>
  );
}
