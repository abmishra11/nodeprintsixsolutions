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
import { setCredential, setToken, setRefreshToken } from "../../redux/reducer/auth";
import { migrateGuestCart } from "../../utils/migrateGuestCart";
import { useAddCartItemMutation } from "../../redux/services/cart";

type FormData = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const [login] = useLoginMutation();
  const [addCartItem] = useAddCartItemMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [emailErr, setEmailErr] = useState("");

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {

      const res = await login(data);

      if (res && res.data && res.data.token) {
        const token = res.data.token;
        const role = res.data?.role;

        toast.success("You are now logged in", {
          position: "top-center",
        });

        dispatch(setToken(token));
        dispatch(setRefreshToken(res?.data?.refreshToken))
        dispatch(setCredential(res.data));

        // ✅ Migrate guest cart to server
        await migrateGuestCart(addCartItem);

        if(role === "ADMIN") {
          navigate("/dashboard");
        }else if(role === "VENDOR"){
          navigate("/vendor");
        }else{
          navigate("/customer");
        }
      } else {
        toast.error("Login failed. Please check your credentials.", {
          position: "top-center",
        });
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Something went wrong, please try again");
      setLoading(false);
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
          {...register("email", { required: true })}
          error={!!errors.email || !!emailErr}
          helperText={
            errors.email
              ? "This field is required"
              : emailErr
              ? emailErr
              : ""
          }
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
          {...register("password", { required: true })}
          error={!!errors.password}
          helperText={errors.password && "This field is required"}
          variant="outlined"
        />
      </div>

      {loading ? (
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
