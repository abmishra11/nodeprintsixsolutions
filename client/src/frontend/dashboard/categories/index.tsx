import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { MenuItem } from "@mui/material";
import { useDeleteCategoryMutation, useGetAllCategoriesQuery } from "../../../redux/services/categories";

const Categories: React.FC = () => {
  const navigate = useNavigate();
  const { data: categoriesData, isLoading, isError } = useGetAllCategoriesQuery();
  console.log("categoriesData: ", categoriesData);
  
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleDeleteClick = useCallback(async (id: string) => {
    try {
      await deleteCategory(id).unwrap();
    } catch (error) {
      console.error("Delete category error: ", error);
    }
  }, [deleteCategory]);

  const handleDeleteConfirmation = (id: string) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
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
    data: categoriesData?.categories || [],
    enableRowActions: true,
    positionActionsColumn: "last",
    renderTopToolbarCustomActions: () => (
      <button
        onClick={() => navigate("/dashboard/add-category")}
        className="add-new-button"
      >
        + Add New Category
      </button>
    ),
    renderRowActionMenuItems: ({ row }) => [
      <MenuItem
        key="edit"
        onClick={() => navigate(`/dashboard/edit-category/${row.original._id}`)}
      >
        Edit
      </MenuItem>,
      <MenuItem key="delete" onClick={() => handleDeleteConfirmation(row.original._id)}>
        Delete
      </MenuItem>,
    ],
  });

  // Return loading/error AFTER hooks are defined
  if (isLoading) return <p>Loading categories...</p>;
  if (isError) return <p>Error fetching categories.</p>;

  return <MaterialReactTable table={table} />;
};

export default Categories;

