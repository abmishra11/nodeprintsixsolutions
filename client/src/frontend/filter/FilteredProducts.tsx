import React from "react";
import Product from "../product/Product";
import Paginate from "./Paginate"; 
import { Box } from "@mui/material";

interface FilteredProductsProps {
  products: Array<any>; // Replace `any` with your actual product type
  totalPages: number;
}

const FilteredProducts: React.FC<FilteredProductsProps> = ({
  products = [],
  totalPages = 0,
}) => {
  return (
    <Box>
      <div className="row">
        {products.map((product) => (
          <div className="col-12 col-md-4 col-lg-3 mb-4" key={product.id}>
            <Product product={product} reviews={product.reviews} />
          </div>
        ))}
      </div>

      <Box mt={4}>
        <Paginate totalPages={totalPages} />
      </Box>
    </Box>
  );
};

export default FilteredProducts;
