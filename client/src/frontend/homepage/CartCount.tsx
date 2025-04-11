import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Badge, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom"; // assuming you're using React Router

export default function CartCount() {
  const cartItems = useSelector((store) => store.cart);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <IconButton
      component={Link}
      to="/cart"
      color="primary"
      aria-label="Cart"
    >
      <Badge
        badgeContent={isMounted ? cartItems.length : 0}
        color="primary"
        overlap="circular"
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  );
}
