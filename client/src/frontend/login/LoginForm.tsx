import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Typography,
  CircularProgress,
  Box,
  Link as MuiLink,
} from "@mui/material";
import toast from "react-hot-toast";
import { useLoginMutation } from "../../redux/services/auth";
import { useAppDispatch } from "../../redux/hooks";
import {
  setCredential,
  setToken,
  setRefreshToken,
} from "../../redux/reducer/auth";
import { migrateGuestCart } from "../../utils/migrateGuestCart";
import { useAddCartItemMutation } from "../../redux/services/cart";
import { LoginInput, loginSchema } from "../../types/logininput";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginForm: React.FC = () => {
  const [login] = useLoginMutation();
  const [addCartItem] = useAddCartItemMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginInput> = async (data) => {
    try {
      const res = await login(data).unwrap();
      console.log("res:", res);

      if (res && res.success) {
        const token = res.token;
        const role = res.role;

        toast.success("You are now logged in", {
          position: "top-center",
        });

        dispatch(setToken(token));
        dispatch(setRefreshToken(res?.refreshToken));
        dispatch(setCredential(res));

        // ✅ Migrate guest cart to server
        await migrateGuestCart(addCartItem);

        if (role === "ADMIN") {
          navigate("/dashboard");
        } else if (role === "VENDOR") {
          navigate("/vendor");
        } else {
          navigate("/customer");
        }
      } else {
        toast.error(
          res?.msg || "Login failed. Please check your credentials.",
          {
            position: "top-center",
          }
        );
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Something went wrong, please try again");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <div>
        <Typography color="white" gutterBottom>
          * Your email
        </Typography>
        <TextField
          fullWidth
          type="email"
          placeholder="Enter your email address"
          {...register("email")}
          helperText={errors.email?.message}
          variant="outlined"
          InputLabelProps={{ shrink: true }}
        />
      </div>

      <div>
        <Typography color="white" gutterBottom>
          * Password
        </Typography>
        <TextField
          fullWidth
          type="password"
          placeholder="Enter your password"
          {...register("password")}
          helperText={errors.password?.message}
          variant="outlined"
        />
      </div>

      {isSubmitting ? (
        <Button
          fullWidth
          variant="contained"
          color="primary"
          disabled
          startIcon={<CircularProgress size={20} color="inherit" />}
        >
          Signing you in please wait...
        </Button>
      ) : (
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          className="text-uppercase fw-medium"
          disabled={isSubmitting}
        >
          Login
        </Button>
      )}

      <Box mt={2}>
        <MuiLink
          href="/forget-password"
          color="primary"
          underline="hover"
          sx={{ cursor: "pointer" }}
        >
          Forgot Password?
        </MuiLink>
      </Box>
    </Box>
  );
};

export default LoginForm;
