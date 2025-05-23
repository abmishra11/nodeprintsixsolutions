import { ApiRouteService } from "../../config/app-reference";
import { apiSlice } from "../interceptor/apiSlice";

export interface CartItem {
  productId: string;
  name: string;
  salePrice: number;
  quantity: number;
  imageUrl: string;
}

export const cartApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCartItems: builder.query<CartItem[], void>({
      query: () => ({
        url: `${ApiRouteService.cart}`,
        method: "GET",
      }),
      providesTags: ["Cart"],
    }),

    addCartItem: builder.mutation<CartItem, CartItem>({
      query: (data) => ({
        url: ApiRouteService.cart,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cart"],
    }),

    getCartItemById: builder.query<CartItem, string>({
      query: (id) => ({
        url: `${ApiRouteService.cart}/${id}`,
        method: "GET",
      }),
      providesTags: ["Cart"],
    }),

    updateCartItem: builder.mutation<CartItem, { productId: string; updatedData: CartItem }>({
      query: ({ productId, updatedData }) => ({
        url: `${ApiRouteService.cart}/${productId}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["Cart"],
    }),

    deleteCartItem: builder.mutation<{ success: boolean }, string>({
      query: (productId) => ({
        url: `${ApiRouteService.cart}/${productId}`,
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
