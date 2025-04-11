import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
// import { addToCart } from "@/redux/slices/cartSlice";
import { RootState } from "@/redux/store"; 
import { toast } from "react-hot-toast";

type Product = {
  id: number;
  name: string;
  price: number;
  // Add any other product properties you need
};

interface AddToCartButtonProps {
  product: Product;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
  const [addedProduct, setAddedProduct] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart);

  // useEffect(() => {
  //   const productInCart = cartItems.some((item: Product) => item.id === product.id);
  //   if (productInCart) {
  //     setAddedProduct(true);
  //   }
  // }, [cartItems, product.id]);

  const handleAddToCart = () => {
    if (!addedProduct) {
      //dispatch(addToCart(product));
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
