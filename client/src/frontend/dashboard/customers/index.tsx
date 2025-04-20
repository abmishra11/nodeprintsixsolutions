import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { MenuItem } from "@mui/material";
import { useCustomerStatusChangeMutation, useDeleteCustomerMutation, useGetAllCustomersQuery } from "../../../redux/services/customers";

const Customers: React.FC = () => {
  const navigate = useNavigate();

  const { data: customers, isLoading, isError } = useGetAllCustomersQuery()

  const [stausChangeCustomer] = useCustomerStatusChangeMutation()

  const handleStatusChangeClick = useCallback(async (id: string, status: boolean) => {
    try {
      const statusData = { status: !status };
      await stausChangeCustomer({ id, statusData }).unwrap();
    } catch (error) {
      console.error("Delete customer error: ", error);
    }
  }, [stausChangeCustomer]);

  const handleStatusChange = (id: string, status: boolean) => {
    const statusText = status ? "Deactivate" : "Activate";
    if (window.confirm(`Are you sure you want to ${statusText} this customer?`)) {
      handleStatusChangeClick(id, status);
    }
  };

  const columns = useMemo(() => [
    {
      accessorKey: "name",
      header: "Name",
      size: 150,
    },
    {
      accessorKey: "email",
      header: "Email",
      size: 150,
    },
    {
      accessorKey: "emailVerified",
      header: "Email Verified",
      size: 150,
      Cell: ({ cell }) => (cell.getValue() ? "Yes" : "No"),
    },
    {
      accessorKey: "status",
      header: "Status",
      size: 150,
      Cell: ({ cell }) => (cell.getValue() ? "Active" : "Inactive"),
    },
  ], []);

  const table = useMaterialReactTable({
    columns,
    data: customers?.customers || [],
    enableRowActions: true,
    positionActionsColumn: "last",

    renderRowActionMenuItems: ({ row }) => [
      <MenuItem
        key="edit"
        onClick={() => navigate(`/dashboard/edit-customer/${row.original._id}`)}
      >
        Edit
      </MenuItem>,
      <MenuItem key="statuschange" onClick={() => handleStatusChange(row.original._id, row.original.status)}>
        {row.original.status ? "Deactivate" : "Activate"}
      </MenuItem>,
    ],
  });

  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p>Error fetching products.</p>;

  return <MaterialReactTable table={table} />;
};

export default Customers;

