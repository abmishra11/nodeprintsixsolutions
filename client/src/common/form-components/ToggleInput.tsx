// ToggleInput.tsx
import React from 'react';
import { useController, Control } from 'react-hook-form';
import { FormControlLabel, Switch, Typography, Grid } from '@mui/material';

interface ToggleInputProps {
  label: string;
  name: string;
  trueTitle: string;
  falseTitle: string;
  control: Control<any>;
  className?: string;
}

const ToggleInput: React.FC<ToggleInputProps> = ({
  label,
  name,
  trueTitle,
  falseTitle,
  control,
  className = '',
}) => {
  const {
    field: { value, onChange, onBlur },
  } = useController({ name, control });

  return (
    <Grid container spacing={2} className={className}>
      <Grid item xs={12} sm={6}>
        <Typography variant="subtitle1" component="h2" gutterBottom>
          {label}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControlLabel
          control={
            <Switch
              checked={!!value}
              onChange={onChange}
              onBlur={onBlur}
              color="primary"
            />
          }
          label={value ? trueTitle : falseTitle}
        />
      </Grid>
    </Grid>
  );
};

export default ToggleInput;
