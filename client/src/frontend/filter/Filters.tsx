import React, { useState } from "react";
import { Button, Collapse, Paper, Divider, Box } from "@mui/material";
import PriceFilter from "./PriceFilter";
import CategoryFilter from "./CategoryFilter";

interface FiltersProps {
  pageUrl: string;
  categories: any[]; // Replace with actual type if available
  search: string;
}

const Filters: React.FC<FiltersProps> = ({ pageUrl, categories, search }) => {
  const [filtersVisible, setFiltersVisible] = useState(false);

  const lastSlug = pageUrl.replace(/\/$/, "").split("/").pop() || "";

  const toggleFilters = () => {
    setFiltersVisible((prev) => !prev);
  };

  return (
    <div>
      {/* Mobile Toggle Button */}
      <div className="d-md-none mb-3">
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={toggleFilters}
        >
          {filtersVisible ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>

      {/* Filters Container */}
      <Collapse in={filtersVisible || window.innerWidth >= 768}>
        <Paper elevation={3} className="p-3 mt-2">
          <Box className="d-flex flex-column gap-4">
            {/* Category Filter */}
            <div>
              <CategoryFilter categories={categories} slug={lastSlug} />
              <Divider className="my-2" />
            </div>

            {/* Price Filter */}
            <div>
              <PriceFilter pageUrl={pageUrl} search={search} />
              <Divider className="my-2" />
            </div>

            {/* Brand Filter (Uncomment if needed) */}
            {/* <div>
              <BrandFilter pageUrl={pageUrl} search={search} />
              <Divider className="my-2" />
            </div> */}
          </Box>
        </Paper>
      </Collapse>
    </div>
  );
};

export default Filters;
