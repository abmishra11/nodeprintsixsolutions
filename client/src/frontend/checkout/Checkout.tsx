import React, { useEffect, useState } from "react";
import Steps from "./Steps";
import CartBanner from "./CartBanner";
import StepForm from "./StepForm";
import { Box, Container, Paper } from "@mui/material";

const steps = [
  { number: 1, title: "Personal Details" },
  { number: 2, title: "Shipping Address Details" },
  { number: 3, title: "Billing Address Details" },
  { number: 4, title: "Payment Method" },
  { number: 5, title: "Order Summary" },
];

const Checkout: React.FC = () => {
  const [userData, setUserData] = useState(null);
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem("userId"); // or use auth context
      const [userRes, addressRes] = await Promise.all([
        axios.get(`/api/userprofile/${userId}`),
        axios.get(`/api/customer/address/customeraddress/${userId}`),
      ]);
      setUserData(userRes.data);
      setAddresses(addressRes.data);
    };

    fetchData();
  }, []);

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
