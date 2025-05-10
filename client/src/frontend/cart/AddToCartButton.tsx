import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { toast } from "react-hot-toast";
import { RootState } from "../../redux/Store";
import { useAddCartItemMutation, useGetCartItemsQuery } from "../../redux/services/cart";
import { addToCart } from "../../redux/reducer/cart";

type CartItem = {
  id: string;
  name: string;
  salePrice: number;
  quantity: number;
  imageUrl: string;
};

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

  const isAuthenticated = useSelector((state: RootState) => state.auth.userId);

  const {
    data: serverCart = [],
    isLoading: isCartLoading,
    error: cartError,
  } = useGetCartItemsQuery(undefined, {
    skip: !isAuthenticated,
  });

  const guestCart = useMemo(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("guest_cart") || "[]");
    }
    return [];
  }, []);

  const cartItems = isAuthenticated ? serverCart : guestCart;
  
  const dispatch = useDispatch();
  const [addCartItem, { isLoading }] = useAddCartItemMutation();

  const isProductAdded = useMemo(() => {
    return cartItems.some((item: CartItem) => item.productId === product.id);
  }, [cartItems, product]);

  useEffect(() => {
    setAddedProduct(isProductAdded);
  }, [isProductAdded]);

  const handleAddToCart = async () => {
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      salePrice: product.salePrice,
      quantity: product.quantity,
      imageUrl: product.imageUrl ?? "",
    };

    if (isAuthenticated) {
      try {
        await addCartItem({
          productId: cartItem.id,
          name: cartItem.name,
          salePrice: cartItem.salePrice,
          quantity: cartItem.quantity,
          imageUrl: cartItem.imageUrl,
        }).unwrap();
        toast.success("Item added to cart");
        setAddedProduct(true);
      } catch (error) {
        console.error(error);
        toast.error("Failed to add item");
      }
    } else {
      dispatch(addToCart(cartItem));

      const existingCart = JSON.parse(localStorage.getItem("guest_cart") || "[]");

      const existingIndex = existingCart.findIndex((item: CartItem) => item.id === cartItem.id);

      if (existingIndex !== -1) {
        existingCart[existingIndex].quantity += cartItem.quantity;
      } else {
        existingCart.push(cartItem);
      }

      localStorage.setItem("guest_cart", JSON.stringify(existingCart));
      toast.success("Item added to guest cart");
      setAddedProduct(true);
    }
  };

  return (
    <Button
      variant="contained"
      fullWidth
      onClick={handleAddToCart}
      disabled={addedProduct}
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
      {addedProduct ? "Added to Cart" : "Add to Cart"}
    </Button>
  );
};

export default AddToCartButton;
