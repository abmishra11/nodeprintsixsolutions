import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import {
  TextField,
  Button,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";
import { toast } from "react-toastify";
import { useUserSignupMutation } from "../../redux/services/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupInput, signupSchema } from "../../types/signupInput";

interface RegisterFormProps {
  role?: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ role = "USER" }) => {
  const location = useLocation();
  const [signup] = useUserSignupMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    mode: "onTouched",
  });

  const {
    ref: emailRef,
    onChange: emailOnChange,
    ...emailRest
  } = register("email");

  const [emailErr, setEmailErr] = useState("");

  const onSubmit: SubmitHandler<SignupInput> = async (data) => {
    setEmailErr("");
    const { confirmPassword, ...signupData } = data;

    try {
      const result = await signup(signupData);
      console.log("result", result);

      if ("data" in result && result.data?.success) {
        toast.success(result.data.msg);
        reset();
      } else if ("error" in result) {
        const error = result.error as any;
        if (
          error.status === 400 &&
          error.data?.msg?.includes("Email already exists")
        ) {
          setEmailErr("Email already exists");
        } else {
          toast.error("Registration failed. Please try again.");
        }
      }
    } catch (error) {
      console.error("Network error:", error);
      toast.error("Network issue. Check your connection.");
    } finally {
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      className="p-4"
      noValidate
      autoComplete="off"
    >
      <input type="hidden" value={role} {...register("role")} />

      <Box mb={2}>
        <TextField
          fullWidth
          label="Your Name"
          variant="outlined"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
      </Box>

      <Box mb={2}>
        <TextField
          fullWidth
          label="Your Email"
          type="email"
          variant="outlined"
          inputRef={emailRef}
          onChange={(e) => {
            setEmailErr("");
            emailOnChange(e);
          }}
          error={!!errors.email || !!emailErr}
          helperText={errors.email?.message || emailErr}
          {...emailRest}
        />
      </Box>

      <Box mb={2}>
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
      </Box>

      <Box mb={2}>
        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          variant="outlined"
          {...register("confirmPassword")}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
        />
      </Box>

      <Box mb={2}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          disabled={isSubmitting}
          className="text-white"
        >
          {isSubmitting ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            "Sign Up"
          )}
        </Button>
      </Box>

      <Typography variant="body2" className="text-white text-center mb-2">
        Already have an account?{" "}
        <a href="/login" className="text-primary fw-bold">
          Login
        </a>
      </Typography>

      {role === "USER" ? (
        <Typography variant="body2" className="text-white text-center">
          Are you a vendor?{" "}
          <a href="/register-vendor" className="text-primary fw-bold">
            Register here
          </a>
        </Typography>
      ) : (
        <Typography variant="body2" className="text-white text-center">
          Are you a user?{" "}
          <a href="/vendor-pricing" className="text-primary fw-bold">
            Register here
          </a>
        </Typography>
      )}
    </Box>
  );
};

export default RegisterForm;
