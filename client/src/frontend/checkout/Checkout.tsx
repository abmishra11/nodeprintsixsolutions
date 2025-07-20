import React from "react";
import Steps from "./Steps";
import CartBanner from "./CartBanner";
import StepForm from "./StepForm";
import { Box, Container, Paper } from "@mui/material";
import { CheckoutSteps } from "../../types/checkoutsteps";
import { User } from "../../types/user";
import { useGetUserDetailsQuery } from "../../redux/services/users";

const steps: CheckoutSteps[] = [
  { number: 1, title: "Personal Details" },
  { number: 2, title: "Shipping Address Details" },
  { number: 3, title: "Billing Address Details" },
  { number: 4, title: "Payment Method" },
  { number: 5, title: "Order Summary" },
];

const Checkout: React.FC = () => {
  const {
    data: userData,
    isLoading: loadingUserData,
    isError,
    error,
  } = useGetUserDetailsQuery();

  console.log("user: ", userData);

  if (loadingUserData) return <div>Loading…</div>;
  if (isError) return <div>Error: {JSON.stringify(error)}</div>;

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4 }}>
          <Steps steps={steps} />
          <Box sx={{ mt: 3 }}>
            <CartBanner />
            <StepForm userData={userData?.user} />
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Checkout;
