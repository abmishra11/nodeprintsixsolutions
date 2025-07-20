import { ApiRouteService } from "../../config/app-reference";
import { apiSlice } from "../interceptor/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    userSignup: builder.mutation<any, any>({
      query: (data) => ({
        url: ApiRouteService.userSignup,
        method: "POST",
        body: data,
      }),
    }),

    getUserDetails: builder.query<any, void>({
      query: () => ({
        url: ApiRouteService.userdetails,
        method: "GET",
      }),
    }),
  }),
});

export const { useUserSignupMutation, useGetUserDetailsQuery } = userApi;
