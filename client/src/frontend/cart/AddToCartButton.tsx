import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { toast } from "react-hot-toast";
import { addToCart } from "../../redux/reducer/cart";
import { RootState } from "../../redux/Store";

type Product = {
  id: number;
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
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    const productInCart = cartItems.some((item: Product) => item.id === product.id);
    console.log("Product in cart:", productInCart);
    console.log("Cart items:", cartItems);
    
    if (productInCart) {
      setAddedProduct(true);
    }
  }, [cartItems, product.id]);

  const handleAddToCart = () => {
    if (!addedProduct) {
      dispatch(addToCart( product ));
      toast.success("Item added successfully");
      setAddedProduct(true);
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
