import { ApiRouteService } from "../../config/app-reference";
import { apiSlice } from "../interceptor/apiSlice";

export const customerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getAllCustomers: builder.query({
      query: () => ({
        url: ApiRouteService.customer,
        method: "GET",
      }),
      providesTags: ["Customer"],
    }),

    getCustomerById: builder.query({
      query: (id) => ({
        url: `${ApiRouteService.customer}/${id}`,
        method: "GET",
      }),
      providesTags: ["Customer"],
    }),

    // Update Customer
    updateCustomer: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `${ApiRouteService.customer}/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["Customer"],
    }),

    customerStatusChange: builder.mutation({
      query: ({ id, statusData }) => ({
        url: `${ApiRouteService.customer}/status/${id}`,
        method: "PUT",
        body: statusData,
      }),
      invalidatesTags: ["Customer"],
    }),

  }),
});

export const { 
  useGetAllCustomersQuery,  
  useGetCustomerByIdQuery,
  useUpdateCustomerMutation,
  useCustomerStatusChangeMutation,
} = customerApi;
