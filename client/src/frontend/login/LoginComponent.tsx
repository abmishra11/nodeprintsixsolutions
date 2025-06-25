import React from "react";
import { Container, Box, Typography, Paper } from "@mui/material";
import { Link } from "react-router-dom"; 
import LoginForm from "./LoginForm";
import { Toaster } from "react-hot-toast";

const LoginComponent: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#121212",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={8}
          sx={{
            p: 5,
            borderRadius: 3,
            backgroundColor: "#2d2d2d",
            color: "#fff",
          }}
        >
          <Typography variant="h5" align="center" gutterBottom>
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

          <Typography variant="body2" mt={4} align="center">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-primary">
              Register now
            </Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginComponent;
