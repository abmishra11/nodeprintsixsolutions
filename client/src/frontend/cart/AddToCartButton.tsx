import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { toast } from "react-hot-toast";
import { RootState } from "../../redux/Store";
import { useAddCartItemMutation } from "../../redux/services/cart";

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

  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [addCartItem, { isLoading }] = useAddCartItemMutation();

  useEffect(() => {
    const productInCart = cartItems.some((item: Product) => item.id === product.id);
    console.log("Product in cart:", productInCart);
    console.log("Cart items:", cartItems);
    
    if (productInCart) {
      setAddedProduct(true);
    }
  }, [cartItems, product.id]);

  const handleAddToCart = async () => {
    if (!addedProduct) {
      try {
        await addCartItem({
          productId: product.id.toString(), 
          name: product.name,
          salePrice: product.salePrice,
          quantity: product.quantity,
          imageUrl: product.imageUrl ?? ""
        }).unwrap();
        toast.success("Item added successfully");
        setAddedProduct(true);
      } catch (error) {
        console.error(error);
        toast.error("Failed to add item");
      }
    }
  };

  return (
    <Button
      variant="contained"
      fullWidth
      onClick={handleAddToCart}
      disabled={addedProduct}
      className={`text-white py-2 rounded-lg transition ${
        addedProduct ? "bg-success border-success" : "bg-primary border-primary"
      }`}
      sx={{
        "&:hover": {
          backgroundColor: "white",
          color: "primary.main",
          border: "1px solid",
          borderColor: addedProduct ? "success.main" : "primary.main",
        },
      }}
    >
      {addedProduct ? "Added to Cart" : "Add to Cart"}
    </Button>
  );
};

export default AddToCartButton;
