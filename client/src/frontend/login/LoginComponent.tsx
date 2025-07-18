import React from "react";
import { Container, Box, Typography, Paper } from "@mui/material";
import LoginForm from "./LoginForm";
import { Toaster } from "react-hot-toast";

const LoginComponent: React.FC = () => {
  return (
    <section className="d-flex align-items-center justify-content-center min-vh-100">
      <Container maxWidth="sm">
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
          <Typography variant="h5" align="center" gutterBottom color="secondary.main">
            Login
          </Typography>

          <LoginForm />
          <Toaster position="top-center" />

          {/* Uncomment if you want social login buttons */}
          {/*
          <Box position="relative" textAlign="center" mt={6}>
            <Box
              component="span"
              sx={{
                position: "relative",
                zIndex: 2,
                px: 2,
                backgroundColor: "#3f51b5",
                color: "#fff",
                textTransform: "uppercase",
              }}
            >
              Or login with
            </Box>
            <Box
              sx={{
                position: "absolute",
                left: 0,
                top: "50%",
                width: "100%",
                borderBottom: "2px solid #ccc",
                zIndex: 1,
              }}
            />
          </Box>

          <Box mt={4} display="flex" gap={2}>
            <Link
              to="#"
              className="btn btn-primary w-50 text-white text-uppercase"
              style={{ backgroundColor: "#3b5998" }}
            >
              Facebook
            </Link>
            <Link
              to="#"
              className="btn btn-warning w-50 text-white text-uppercase"
            >
              Google
            </Link>
          </Box>
          */}
        </Box>
      </Container>
    </section>
  );
};

export default LoginComponent;
