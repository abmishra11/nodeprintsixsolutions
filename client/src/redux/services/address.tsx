import { ApiRouteService } from "../../config/app-reference";
import { apiSlice } from "../interceptor/apiSlice";
import { Address } from "../../types/address";

export const addressApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addAddress: builder.mutation<Address, Address>({
      query: (data) => ({
        url: ApiRouteService.address,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Address"],
    }),

    getAddresses: builder.query<Address[], void>({
      query: () => ({
        url: `${ApiRouteService.address}`,
        method: "GET",
      }),
      providesTags: ["Address"],
    }),

    getAddressById: builder.query<Address, string>({
      query: (id) => ({
        url: `${ApiRouteService.address}/${id}`,
        method: "GET",
      }),
      providesTags: ["Address"],
    }),

    getDefaultAddress: builder.query<Address, void>({
      query: () => ({
        url: `${ApiRouteService.address}/default`,
        method: "GET",
      }),
      providesTags: ["Address"],
    }),

    setDefaultAddress: builder.mutation<Address, string>({
      query: (id) => ({
        url: `${ApiRouteService.address}/${id}/default`,
        method: "PATCH",
      }),
      invalidatesTags: ["Address"],
    }),

    updateAddress: builder.mutation<
      Address,
      { id: string; updatedData: Address }
    >({
      query: ({ id, updatedData }) => ({
        url: `${ApiRouteService.address}/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["Address"],
    }),

    deleteAddress: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `${ApiRouteService.address}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Address"],
    }),
  }),
});

export const {
  useAddAddressMutation,
  useGetAddressesQuery,
  useGetAddressByIdQuery,
  useGetDefaultAddressQuery,
  useSetDefaultAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} = addressApi;
