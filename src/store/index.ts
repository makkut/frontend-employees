import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { employeesApi } from "./employeesApi";
import statsAuth from "./statsAuth";

const rootReducers = combineReducers({
    auth: statsAuth,
    [employeesApi.reducerPath]: employeesApi.reducer
});

const store = configureStore({
    reducer: rootReducers,

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(employeesApi.middleware),
});
export default store;
