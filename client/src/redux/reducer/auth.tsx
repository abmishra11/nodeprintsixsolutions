import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  token: string;
  refreshToken: string;
  name: string;
  email: string;
  userId: string;
  role: string;
}

const initialState: AuthState = {
  token: "",
  refreshToken: "",
  name: "",
  email: "",
  userId: "",
  role: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredential: (
      state,
      action: PayloadAction<{ name: string; email: string; userId: string; role: string }>
    ) => {
      const { name, email, userId, role } = action.payload;
      state.name = name;
      state.email = email;
      state.userId = userId;
      state.role = role;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
    },
    logOut: () => initialState,
  },
});

export const { setCredential, setToken, setRefreshToken, logOut } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state: any) => state.auth.email;
