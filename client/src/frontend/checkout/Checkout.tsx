import React, { useEffect, useState } from "react";
import Steps from "./Steps";
import CartBanner from "./CartBanner";
import StepForm from "./StepForm";
import { Box, Container, Paper } from "@mui/material";
import { useGetAddressesQuery } from "../../redux/services/address";
import { useSelector } from "react-redux";

const steps = [
  { number: 1, title: "Personal Details" },
  { number: 2, title: "Shipping Address Details" },
  { number: 3, title: "Billing Address Details" },
  { number: 4, title: "Payment Method" },
  { number: 5, title: "Order Summary" },
];

const Checkout: React.FC = () => {


  const [addresses, { loading: loadingAddresses }] = useGetAddressesQuery();
  const userData = useSelector((state: RootState) => state.auth);

  if (loadingAddresses) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4 }}>
          <Steps steps={steps} />
          <Box sx={{ mt: 3 }}>
            <CartBanner />
            <StepForm userData={userData} addresses={addresses} />
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Checkout;
