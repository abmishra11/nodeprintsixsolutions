import React from "react";
import { TextField, Typography } from "@mui/material";
import { UseFormRegister, FieldErrors } from "react-hook-form";

interface TextareaInputProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  isRequired?: boolean;
  className?: string;
}

const TextareaInput: React.FC<TextareaInputProps> = ({
  label,
  name,
  register,
  errors,
  isRequired = true,
  className = "col-12", // Bootstrap default
}) => {
  return (
    <div className={className}>
      <Typography variant="subtitle1" className="mb-2">
        {isRequired ? `* ${label}` : label}
      </Typography>

      <TextField
        {...register(name, { required: isRequired })}
        id={name}
        name={name}
        multiline
        rows={3}
        fullWidth
        placeholder={`Type the ${label.toLowerCase()}`}
        variant="outlined"
        error={!!errors[name]}
        helperText={errors[name] ? `${label} is required` : ""}
      />
    </div>
  );
};

export default TextareaInput;
