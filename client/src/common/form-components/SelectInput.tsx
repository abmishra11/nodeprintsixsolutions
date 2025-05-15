import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormHelperText,
} from "@mui/material";

export interface Option {
  id: string | number;
  title: string;
}

interface SelectInputProps {
  label: string;
  name: string;
  value: string | string[];
  onChange: (event: SelectChangeEvent<string | string[]>) => void;
  options: Option[];
  className?: string;
  multipleSelect?: boolean;
  isRequired?: boolean;
  error?: boolean;
  helperText?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  className = "mb-3", // Bootstrap spacing
  multipleSelect = false,
  isRequired = true,
  error = false,
  helperText = "",
}) => {
  return (
    <FormControl
      fullWidth
      required={isRequired}
      error={error}
      className={className}
    >
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select
        labelId={`${name}-label`}
        id={name}
        name={name}
        multiple={multipleSelect}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.title}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default SelectInput;
