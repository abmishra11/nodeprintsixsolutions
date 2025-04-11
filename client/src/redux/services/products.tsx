import { ApiRouteService } from "../../config/app-reference";
import { apiSlice } from "../interceptor/apiSlice";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: ({ page = 1, sort = "asc", min = 0, max = "", search = "" }) => {
        let url = `${ApiRouteService.product}?page=${page}&sort=${sort}&min=${min}`;
        if (max !== "") url += `&max=${max}`;
        if (search) url += `&search=${encodeURIComponent(search)}`;
        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["Product"],
    }),

    addProduct: builder.mutation<any, any>({
      query: (data) => ({
        url: ApiRouteService.product,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),

    getProductById: builder.query({
      query: (id) => ({
        url: `${ApiRouteService.product}/${id}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    getProductBySlug: builder.query({
      query: (slug) => ({
        url: `${ApiRouteService.product}/slug/${slug}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    // Update Category
    updateProduct: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `${ApiRouteService.product}/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["Product"],
    }),

    // Delete Category
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `${ApiRouteService.product}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const { 
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useGetProductBySlugQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation
} = productApi;
