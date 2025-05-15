import React from "react";
import Steps from "./Steps";
import CartBanner from "./CartBanner";
import StepForm from "./StepForm";
import { Box, Container, Paper } from "@mui/material";
import { useGetAddressesQuery } from "../../redux/services/address";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store"; 

const steps = [
  { number: 1, title: "Personal Details" },
  { number: 2, title: "Shipping Address Details" },
  { number: 3, title: "Billing Address Details" },
  { number: 4, title: "Payment Method" },
  { number: 5, title: "Order Summary" },
];

const Checkout: React.FC = () => {

  const {
    data: addressData,
    isLoading: loadingAddresses,
    isError,
    error,
  } = useGetAddressesQuery();
  const addresses = addressData?.addresses || [];
  const userData = useSelector((state: RootState) => state.auth);
  

  if (loadingAddresses) return <div>Loading…</div>;
  if (isError) return <div>Error: {JSON.stringify(error)}</div>;

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
