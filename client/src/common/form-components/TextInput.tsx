import React from "react";
import { TextField, FormHelperText, FormControl, InputLabel } from "@mui/material";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface TextInputProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  isRequired?: boolean;
  type?: string;
  className?: string;
  defaultValue?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  register,
  errors,
  isRequired = true,
  type = "text",
  className = "",
  defaultValue = "",
}) => {
  const error = !!errors[name];

  return (
    <FormControl fullWidth className={className} margin="normal">
      <TextField
        {...register(name, { required: isRequired })}
        label={isRequired ? `* ${label}` : label}
        name={name}
        type={type}
        defaultValue={defaultValue}
        error={error}
        helperText={error ? `${label} is required` : " "}
        variant="outlined"
        fullWidth
      />
    </FormControl>
  );
};

export default TextInput;
