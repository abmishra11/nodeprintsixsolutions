import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import FilterComponent from "../filter/FilterComponent";
import Pagination from "@mui/material/Pagination";
import { useGetAllCategoriesQuery } from "../../redux/services/categories";

const CategoryShop: React.FC = () => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get("sort") || null;
  const page = parseInt(searchParams.get("page") || "1");
  const min = parseInt(searchParams.get("min") || "0");
  const max = searchParams.get("max");

  const { data: allCategoriesData, isLoading, isError } = useGetAllCategoriesQuery();

  if (isLoading) return <div className="text-center mt-5">Loading...</div>;
  if (isError || !allCategoriesData?.categories) return <div className="text-center mt-5">Error loading categories.</div>;

  const categoriesWithProducts = allCategoriesData.categories.filter(
    (cat) => Array.isArray(cat.products) && cat.products.length > 0
  );

  const category = allCategoriesData.categories.find((cat) => cat.slug === slug);
  if (!category) return <div className="text-center mt-5">Category not found.</div>;

  // Step 1: Filter by min/max price
  let filteredProducts = [...(category.products || [])].filter((product) => {
    const price = product.salePrice;
    const maxPrice = max ? parseFloat(max) : Infinity;
    return price >= min && price <= maxPrice;
  });

  // Step 2: Sort
  if (sort === "asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sort === "desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  // Step 3: Paginate
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const filterData = {
    title: category.title,
    products: paginatedProducts,
    productsCount: filteredProducts.length,
    totalPages,
    pageUrl: `/category/${slug}`,
    search: "",
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    searchParams.set("page", value.toString());
    setSearchParams(searchParams);
  };

  return (
    <div className="container mt-4">

      <FilterComponent filterData={filterData} categories={categoriesWithProducts} />

      <div className="d-flex justify-content-center mt-4">
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </div>
    </div>
  );
};

export default CategoryShop;
