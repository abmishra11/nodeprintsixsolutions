import { ApiRouteService } from "../../config/app-reference";
import { apiSlice } from "../interceptor/apiSlice";

export interface Login {
  userKey: string;
  password: string;
  key: string;
}

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Performs a login request.
     *
     * @param body - 
     * @returns 
     */
    login: builder.mutation<Login, Partial<Login>>({
      query: (body) => ({
        url: ApiRouteService.login,
        method: "POST",
        body,
      }),
    }),
  
    UserLogout: builder.mutation<Login, Partial<Login>>({
      query: (body) => ({
        url: ApiRouteService.logout,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLoginMutation, useUserLogoutMutation } = authApi;
