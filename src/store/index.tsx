import { configureStore } from "@reduxjs/toolkit";
import { authenticationReducer } from "../slices/auth";
import serviceReducer from "../slices/Services";
export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    services: serviceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
