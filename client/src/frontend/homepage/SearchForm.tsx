import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  InputBase,
  IconButton,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchForm() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const handleSearch = (data) => {
    const { search } = data;
    reset();
    navigate(`/search?search=${encodeURIComponent(search)}`);
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit(handleSearch)}
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        border: '1px solid #1976d2',
        borderRadius: 2,
      }}
      elevation={0}
    >
      <IconButton sx={{ p: '10px', color: 'gray' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        {...register("search")}
        placeholder="Search products..."
        inputProps={{ 'aria-label': 'search products' }}
        sx={{ ml: 1, flex: 1 }}
        required
      />
      <button
        type="submit"
        className="btn btn-primary"
        style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
      >
        Search
      </button>
    </Paper>
  );
}
