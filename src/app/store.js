import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import authSliceReducer from "../features/auth/authSlice";
import projectSliceReducer from "../features/project/projectSlice";
import teamSliceReducer from "../features/team/teamSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSliceReducer,
        project: projectSliceReducer,
        team: teamSliceReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddlewares) =>
        getDefaultMiddlewares().concat(apiSlice.middleware),
});
