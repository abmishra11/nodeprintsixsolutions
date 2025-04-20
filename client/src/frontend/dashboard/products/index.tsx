import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { MenuItem } from "@mui/material";
import { useDeleteProductMutation, useGetAllProductsQuery } from "../../../redux/services/products";

const Products: React.FC = () => {
  const navigate = useNavigate();
  
  const page = 1;
  const sort = "asc";
  const min = 0;
  const max = ""; 
  const search = "";

  const { data: products, isLoading, isError } = useGetAllProductsQuery({page, sort, min, max, search});

  const [deleteCategory] = useDeleteProductMutation();

  const handleDeleteClick = useCallback(async (id: string) => {
    try {
      await deleteCategory(id).unwrap();
    } catch (error) {
      console.error("Delete category error: ", error);
    }
  }, [deleteCategory]);

  const handleDeleteConfirmation = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      handleDeleteClick(id);
    }
  };

  const columns = useMemo(() => [
    {
      accessorKey: "title",
      header: "Category",
      size: 150,
    },
    {
      accessorKey: "description",
      header: "Description",
      size: 150,
    },
    {
      accessorKey: "imageUrl",
      header: "Image",
      size: 150,
      Cell: ({ cell }) => {
        const imageUrl = cell.getValue();
        return imageUrl ? (
          <img
            src={imageUrl}
            alt="Category"
            style={{
              width: 100,
              height: 100,
              objectFit: "cover",
              borderRadius: "5px",
            }}
          />
        ) : (
          <span style={{ color: "gray", fontStyle: "italic" }}>
            No Image Available
          </span>
        );
      },
    },
  ], []);

  // Ensure useMaterialReactTable is called unconditionally
  const table = useMaterialReactTable({
    columns,
    data: products?.products || [],
    enableRowActions: true,
    positionActionsColumn: "last",
    renderTopToolbarCustomActions: () => (
      <button
        onClick={() => navigate("/dashboard/add-product")}
        className="add-new-button"
      >
        + Add New Product
      </button>
    ),
    renderRowActionMenuItems: ({ row }) => [
      <MenuItem
        key="edit"
        onClick={() => navigate(`/dashboard/edit-product/${row.original._id}`)}
      >
        Edit
      </MenuItem>,
      <MenuItem key="delete" onClick={() => handleDeleteConfirmation(row.original._id)}>
        Delete
      </MenuItem>,
    ],
  });

  // Return loading/error AFTER hooks are defined
  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p>Error fetching products.</p>;

  return <MaterialReactTable table={table} />;
};

export default Products;

