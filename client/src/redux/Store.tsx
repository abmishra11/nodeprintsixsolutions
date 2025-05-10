import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { apiSlice } from "./interceptor/apiSlice";
import loaderReducer from "../redux/reducer/loader";
import commonResMessage from "../redux/reducer/commonResMessage";
import authReducer from '../redux/reducer/auth';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import { authPersistConfig } from "./config";
import { AuthState } from "../redux/reducer/auth"; 
import cartReducer from '../redux/reducer/cart';
import checkoutReducer from '../redux/reducer/checkout';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    loader: loaderReducer,
    message: commonResMessage,
    // auth: authReducer,
    auth: persistReducer<AuthState>(authPersistConfig, authReducer),
    cart: cartReducer,
    checkout: checkoutReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
