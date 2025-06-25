import { ApiRouteService } from "../../config/app-reference";
import { apiSlice } from "../interceptor/apiSlice";
import type {
  State,
  CreateStatePayload,
  UpdateStatePayload,
} from "../../types/state"

export const stateApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /* ---------- READ ALL ---------- */
    getStatesByCountryId: builder.query<State[], string>({
      query: (countryId) => ({
        url: `${ApiRouteService.state}/by-country/${countryId}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "State" as const, id: _id })),
              { type: "State", id: "LIST" },
            ]
          : [{ type: "State", id: "LIST" }],
    }),

    /* ---------- CREATE ---------- */
    addState: builder.mutation<State, CreateStatePayload>({
      query: (data) => ({
        url: ApiRouteService.state,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "State", id: "LIST" }],
    }),

    /* ---------- READ ONE ---------- */
    getStateById: builder.query<State, string>({
      query: (id) => ({
        url: `${ApiRouteService.state}/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "State", id }],
    }),

    /* ---------- UPDATE ---------- */
    updateState: builder.mutation<State, UpdateStatePayload>({
      query: ({ id, updatedData }) => ({
        url: `${ApiRouteService.state}/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "State", id },
        { type: "State", id: "LIST" },
      ],
    }),

    /* ---------- DELETE ---------- */
    deleteState: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `${ApiRouteService.state}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "State", id },
        { type: "State", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetStatesByCountryIdQuery,
  useAddStateMutation,
  useGetStateByIdQuery,
  useUpdateStateMutation,
  useDeleteStateMutation,
} = stateApi;
