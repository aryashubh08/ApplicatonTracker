import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/slices/authSlice";
import applicationReducer from "../store/slices/applicationSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    app: applicationReducer,
  },
});
