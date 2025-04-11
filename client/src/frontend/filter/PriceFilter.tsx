import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Typography } from '@mui/material';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

type PriceFilterProps = {
  pageUrl: string;
  search?: string;
};

type FormValues = {
  min?: number;
  max?: number;
};

const PriceFilter: React.FC<PriceFilterProps> = ({ pageUrl, search }) => {
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const location = useLocation();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const { min, max } = data;

    if (min !== undefined && max !== undefined && min > max) {
      toast.error('Minimum price cannot be greater than maximum price');
      return;
    }

    const currentParams = new URLSearchParams(location.search);
    currentParams.delete('search');
    currentParams.delete('min');
    currentParams.delete('max');

    if (search) currentParams.set('search', search);
    if (min !== undefined) currentParams.set('min', String(min));
    if (max !== undefined) currentParams.set('max', String(max));

    navigate(`${pageUrl}?${currentParams.toString()}`);
    reset();
  };

  return (
    <div className="pt-4">
      <Typography variant="h6" className="mb-3 text-dark">
        Price
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} className="row g-3 my-3">
        <div className="col-md-4">
          <TextField
            {...register('min', { min: 0 })}
            label="Min"
            type="number"
            fullWidth
            size="small"
            variant="outlined"
          />
        </div>
        <div className="col-md-4">
          <TextField
            {...register('max', { min: 0 })}
            label="Max"
            type="number"
            fullWidth
            size="small"
            variant="outlined"
          />
        </div>
        <div className="col-md-4 d-flex align-items-end">
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Go
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PriceFilter;
