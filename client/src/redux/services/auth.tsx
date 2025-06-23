import { ApiRouteService } from "../../config/app-reference";
import { apiSlice } from "../interceptor/apiSlice";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  name: string;
  email: string;
  role: string;
  userId: string;
  token: string;
  refreshToken: string;
  msg?: string;
}

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Performs a login request.
     *
     * @param body - 
     * @returns 
     */
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: ApiRouteService.login,
        method: "POST",
        body,
      }),
    }),
  
    UserLogout: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: ApiRouteService.logout,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLoginMutation, useUserLogoutMutation } = authApi;
