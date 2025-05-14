import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Paper,
  Grid,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentStep,
  updateCheckoutFormData,
} from "../redux/slices/checkoutSlice";
import NavButtons from "./NavButtons";

export default function PaymentMethodForm() {
  const dispatch = useDispatch();
  const currentStep = useSelector((store) => store.checkout.currentStep);
  const existingFormData = useSelector(
    (store) => store.checkout.checkoutFormData
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { ...existingFormData },
  });

  const initialPaymentMethod = existingFormData.paymentMethod || "";
  const [paymentMethod, setPaymentMethod] = useState(initialPaymentMethod);

  const processData = (data) => {
    data.paymentMethod = paymentMethod;
    dispatch(updateCheckoutFormData(data));
    dispatch(setCurrentStep(currentStep + 1));
  };

  return (
    <form onSubmit={handleSubmit(processData)}>
      <Typography variant="h5" gutterBottom>
        Payment Method
      </Typography>

      <FormControl component="fieldset" fullWidth className="mb-4">
        <FormLabel component="legend">
          Which payment method do you prefer?
        </FormLabel>

        <RadioGroup
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: 2,
                  border:
                    paymentMethod === "Cash On Delivery"
                      ? "2px solid #1976d2"
                      : "1px solid #ccc",
                  backgroundColor:
                    paymentMethod === "Cash On Delivery" ? "#e3f2fd" : "#fff",
                }}
              >
                <FormControlLabel
                  value="Cash On Delivery"
                  control={
                    <Radio {...register("paymentMethod", { required: true })} />
                  }
                  label={
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 10 }}
                    >
                      <FavoriteIcon color="action" />
                      <Typography>Cash On Delivery</Typography>
                    </div>
                  }
                />
                <CircleOutlinedIcon />
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: 2,
                  border:
                    paymentMethod === "Credit Card"
                      ? "2px solid #1976d2"
                      : "1px solid #ccc",
                  backgroundColor:
                    paymentMethod === "Credit Card" ? "#e3f2fd" : "#fff",
                }}
              >
                <FormControlLabel
                  value="Credit Card"
                  control={
                    <Radio {...register("paymentMethod", { required: true })} />
                  }
                  label={
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 10 }}
                    >
                      <CreditCardIcon color="action" />
                      <Typography>Credit Card</Typography>
                    </div>
                  }
                />
                <CircleOutlinedIcon />
              </Paper>
            </Grid>
          </Grid>
        </RadioGroup>

        {errors.paymentMethod && (
          <Typography color="error" variant="body2">
            Please select a payment method.
          </Typography>
        )}
      </FormControl>

      <NavButtons />
    </form>
  );
}
