import { ApiRouteService } from "../../config/app-reference";
import { apiSlice } from "../interceptor/apiSlice";
import type {
  Country,
  CreateCountryPayload,
  UpdateCountryPayload,
} from "../../types/country"

export const countryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /* ---------- READ ALL ---------- */
    getAllCountries: builder.query<Country[], void>({
      query: () => ({
        url: ApiRouteService.country,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Country" as const, id: _id })),
              { type: "Country", id: "LIST" },
            ]
          : [{ type: "Country", id: "LIST" }],
    }),

    /* ---------- CREATE ---------- */
    addCountry: builder.mutation<Country, CreateCountryPayload>({
      query: (data) => ({
        url: ApiRouteService.country,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Country", id: "LIST" }],
    }),

    /* ---------- READ ONE ---------- */
    getCountryById: builder.query<Country, string>({
      query: (id) => ({
        url: `${ApiRouteService.country}/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Country", id }],
    }),

    /* ---------- UPDATE ---------- */
    updateCountry: builder.mutation<Country, UpdateCountryPayload>({
      query: ({ id, updatedData }) => ({
        url: `${ApiRouteService.country}/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Country", id },
        { type: "Country", id: "LIST" },
      ],
    }),

    /* ---------- DELETE ---------- */
    deleteCountry: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `${ApiRouteService.country}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Country", id },
        { type: "Country", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllCountriesQuery,
  useAddCountryMutation,
  useGetCountryByIdQuery,
  useUpdateCountryMutation,
  useDeleteCountryMutation,
} = countryApi;
