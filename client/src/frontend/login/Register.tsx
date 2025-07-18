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
            backgroundColor: "primary.main", 
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <Typography variant="h5" align="center" gutterBottom color="secondary">
            Create an Account
          </Typography>
          <RegisterForm role="USER" />
        </Box>
      </Container>
    </section>
  );
};

export default Register;
