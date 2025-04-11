import React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Sorting from "./Sorting";
import Filters from "./Filters";
import FilteredProducts from "./FilteredProducts";
import FilterBreadcrumb from "./FilterBreadcrumb";

interface FilterComponentProps {
  filterData: {
    title: string;
    products: any[];
    productsCount: number;
    totalPages: number;
    pageUrl: string;
    search: string;
  };
  categories: any[];
}

const FilterComponent: React.FC<FilterComponentProps> = ({ filterData, categories }) => {
  const { title, products, productsCount, totalPages, pageUrl, search } = filterData;

  return (
    <Container>
      {/* Top Row: Breadcrumb and Sorting */}
      <Grid container spacing={3} className="py-4">
        <Grid item xs={12} md={3}>
          <Box display="flex" alignItems="center">
            <FilterBreadcrumb title={title} />
          </Box>
        </Grid>
        <Grid item xs={12} md={9}>
          <Sorting title={title} pageUrl={pageUrl} productsCount={productsCount} />
        </Grid>
      </Grid>

      {/* Main Content: Filters and Product List */}
      <Grid container spacing={3} className="pb-5">
        <Grid item xs={12} md={3}>
          <Box position="sticky" top={16}>
            <Filters pageUrl={pageUrl} categories={categories} search={search} />
          </Box>
        </Grid>
        <Grid item xs={12} md={9}>
          <FilteredProducts totalPages={totalPages} products={products} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default FilterComponent;
