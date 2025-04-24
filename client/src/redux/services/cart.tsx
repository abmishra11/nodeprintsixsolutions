import { ApiRouteService } from "../../config/app-reference";
import { apiSlice } from "../interceptor/apiSlice";

export const cartApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCartItems: builder.query({
      query: () => {
        return {
          url: `${ApiRouteService.cart}`,
          method: "GET",
        };
      },
      providesTags: ["Cart"],
    }),

    addCartItem: builder.mutation<any, any>({
      query: (data) => ({
        url: ApiRouteService.cart,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cart"],
    }),

    getCartItemById: builder.query({
      query: (id) => ({
        url: `${ApiRouteService.cart}/${id}`,
        method: "GET",
      }),
      providesTags: ["Cart"],
    }),

    updateCartItem: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `${ApiRouteService.cart}/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["Cart"],
    }),

    deleteCartItem: builder.mutation({
      query: (id) => ({
        url: `${ApiRouteService.cart}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const { 
  useGetCartItemsQuery,
  useAddCartItemMutation,
  useGetCartItemByIdQuery,
  useUpdateCartItemMutation,
  useDeleteCartItemMutation,
} = cartApi;
