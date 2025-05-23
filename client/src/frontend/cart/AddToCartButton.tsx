import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, CircularProgress } from "@mui/material";
import { toast } from "react-hot-toast";
import { RootState } from "../../redux/Store";
import { useAddCartItemMutation } from "../../redux/services/cart";
import { addToCart } from "../../redux/reducer/cart";
import { CartItem } from "../../types/cart";
import { useCartItems } from "../../hooks/useCartItems";
import { notifyGuestCartChanged } from '../../utils/guestCartEvents';

type Product = {
  id: string;
  name: string;
  salePrice: number;
  quantity: number;
  imageUrl?: string;
};

interface AddToCartButtonProps {
  product: Product;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
  const [addedProduct, setAddedProduct] = useState(false);

  const user = useSelector((state: RootState) => state.auth);
  const isAuthenticated = !!user?.userId;

  const { cartItems } = useCartItems(isAuthenticated);

  const dispatch = useDispatch();
  const [addCartItem, { isLoading }] = useAddCartItemMutation();

  const isProductAdded = useMemo(() => {
    return cartItems.some((item: CartItem) => item.productId === product.id);
  }, [cartItems, product.id]);

  useEffect(() => {
    setAddedProduct(isProductAdded);
  }, [isProductAdded]);

  const handleAddToCart = async () => {
    const cartItem: CartItem = {
      productId: product.id,
      name: product.name,
      salePrice: product.salePrice,
      quantity: product.quantity,
      imageUrl: product.imageUrl ?? "",
    };

    if (isAuthenticated) {
      try {
        await addCartItem(cartItem).unwrap();
        toast.success("Item added to cart");
        setAddedProduct(true);
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to add item");
      }
    } else {
      dispatch(addToCart(cartItem));

      const existingCart: CartItem[] = JSON.parse(localStorage.getItem("guest_cart") || "[]");

      const existingIndex = existingCart.findIndex(
        (item: CartItem) => item.productId === cartItem.productId
      );

      if (existingIndex !== -1) {
        existingCart[existingIndex].quantity += cartItem.quantity;
      } else {
        existingCart.push(cartItem);
      }

      localStorage.setItem("guest_cart", JSON.stringify(existingCart));
      toast.success("Item added to guest cart");
      setAddedProduct(true);
      notifyGuestCartChanged();
    }
  };

  return (
    <Button
      variant="contained"
      fullWidth
      onClick={handleAddToCart}
      disabled={addedProduct || isLoading}
      sx={{
        backgroundColor: addedProduct ? 'success.main' : 'primary.main',
        color: '#fff',
        py: 1.5,
        borderRadius: 2,
        transition: 'all 0.3s ease',
        '&:hover': {
          backgroundColor: '#fff',
          color: addedProduct ? 'success.main' : 'primary.main',
          border: '1px solid',
          borderColor: addedProduct ? 'success.main' : 'primary.main',
        },
      }}
    >
      {isLoading ? <CircularProgress size={24} color="inherit" /> : addedProduct ? "Added to Cart" : "Add to Cart"}
    </Button>
  );
};

export default AddToCartButton;
