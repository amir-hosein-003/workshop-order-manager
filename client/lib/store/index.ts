import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import scenarioReducer from "./features/scenarioSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    scenario: scenarioReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
