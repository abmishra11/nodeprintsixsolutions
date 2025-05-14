import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  CircularProgress,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { clearCart } from "../redux/reducer/cart";
import { setCurrentStep } from "../redux/slices/checkoutSlice";
import { usePlaceOrderMutation } from "../redux/services/orderApi";

const OrderSummary = () => {
  const [placeOrder, { isLoading }] = usePlaceOrderMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart);
  const checkoutFormData = useSelector(
    (state) => state.checkout.checkoutFormData
  );
  const currentStep = useSelector((state) => state.checkout.currentStep);

  const handlePrevious = () => {
    dispatch(setCurrentStep(currentStep - 1));
  };

  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.salePrice * item.qty,
    0
  );
  const shippingCost = parseFloat(checkoutFormData.shippingCost || 0).toFixed(
    2
  );
  const total = (parseFloat(subTotal) + parseFloat(shippingCost)).toFixed(2);

  const handleSubmit = async () => {
    try {
      const response = await placeOrder({
        orderItems: cartItems,
        checkoutFormData,
      }).unwrap();

      toast.success("Order placed successfully!");
      dispatch(clearCart());
      dispatch(setCurrentStep(1));
      navigate(`/order-confirmation/${response.id}`);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="my-4 container">
      <Typography variant="h5" gutterBottom>
        Order Summary
      </Typography>

      {cartItems.map((item, i) => (
        <Card className="mb-3" key={i}>
          <Grid container>
            <Grid item xs={3}>
              <CardMedia
                component="img"
                image={item.imageUrl}
                alt={item.title}
                height="80"
                style={{ objectFit: "contain", padding: "10px" }}
              />
            </Grid>
            <Grid item xs={6}>
              <CardContent>
                <Typography variant="subtitle1">{item.title}</Typography>
              </CardContent>
            </Grid>
            <Grid
              item
              xs={3}
              className="d-flex align-items-center justify-content-around"
            >
              <span className="badge bg-secondary">{item.qty}</span>
              <Typography variant="subtitle1">
                ${parseFloat(item.salePrice).toFixed(2)}
              </Typography>
            </Grid>
          </Grid>
        </Card>
      ))}

      <div className="d-flex justify-content-between py-2 border-bottom">
        <Typography>Shipping Cost</Typography>
        <Typography>${shippingCost}</Typography>
      </div>

      <div className="d-flex justify-content-between py-2 border-bottom">
        <Typography>Total</Typography>
        <Typography>${total}</Typography>
      </div>

      <div className="mt-4 d-flex justify-content-between">
        <Button
          variant="contained"
          color="primary"
          startIcon={<ChevronLeft />}
          onClick={handlePrevious}
        >
          Previous
        </Button>

        <Button
          variant="contained"
          color="success"
          endIcon={
            isLoading ? <CircularProgress size={20} /> : <ChevronRight />
          }
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Proceed to Payment"}
        </Button>
      </div>
    </div>
  );
};

export default OrderSummary;
