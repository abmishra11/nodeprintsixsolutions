import React from "react";
import {
  Container,
  Grid,
  Typography,
  Pagination,
  Box,
  CircularProgress,
} from "@mui/material";
import FilterComponent from "../filter/FilterComponent";
import { useGetAllCategoriesQuery } from "../../redux/services/categories";
import { useGetAllProductsQuery } from "../../redux/services/products";
import { useSearchParams, useNavigate } from "react-router-dom";

const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const sort = searchParams.get("sort") || "asc";
  const page = parseInt(searchParams.get("page") || "1");
  const min = parseInt(searchParams.get("min") || "0");
  const max = searchParams.get("max") || "";

  const {
    data: productsData,
    isLoading: productsLoading,
    isError: productsError,
  } = useGetAllProductsQuery({ page, sort, min, max });

  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useGetAllCategoriesQuery();

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    searchParams.set("page", value.toString());
    setSearchParams(searchParams);
  };

  if (productsLoading || categoriesLoading) {
    return (
      <Container className="py-4">
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (productsError || categoriesError) {
    return (
      <Container className="py-4">
        <Typography color="error" variant="h6">
          Error loading data.
        </Typography>
      </Container>
    );
  }

  const products = productsData?.products || [];
  const productsCount = productsData?.productsCount || 0;
  const totalPages = productsData?.totalPages || 1;

  const categories =
    categoriesData?.categories?.filter((c) => c.products.length > 0) || [];

  const filterData = {
    title: "Shop",
    products,
    productsCount,
    totalPages,
    pageUrl: "/shop",
    search: searchParams.get("search") || "",
  };

  return (
    <Container className="py-4">
      <Typography variant="h4" gutterBottom>
        Shop
      </Typography>

      {/* Products Grid */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FilterComponent filterData={filterData} categories={categories} />
        </Grid>
      </Grid>

      {/* Pagination */}
      <Box mt={4} display="flex" justifyContent="center">
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Container>
  );
};

export default Shop;
