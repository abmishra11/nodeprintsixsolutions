// Register.tsx
import React from "react";
import RegisterForm from "./RegisterForm";
import { Container, Box, Typography, Paper } from "@mui/material";

const Register: React.FC = () => {
  return (
    <section className="d-flex align-items-center justify-content-center min-vh-100">
      <Container>
        <Box
          component={Paper}
          elevation={10}
          sx={{
            maxWidth: 500,
            mx: "auto",
            p: 4,
            backgroundColor: "#2d3748", // similar to bg-gray-800
            color: "white",
            border: "1px solid #4a5568", // similar to border-gray-700
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            Create an Account
          </Typography>
          <RegisterForm role="USER" />
        </Box>
      </Container>
    </section>
  );
};

export default Register;
