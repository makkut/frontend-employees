import { EmployeeInterface } from "@/interfaces/interfaces";
import { AuthInterface } from "@/interfaces/interfaces";
import { TokenInterface } from "@/interfaces/interfaces";
import localStorageService from "@/services/localStorage.service";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = process.env.API_URL;

type EmployeesResponse = EmployeeInterface[]

export const employeesApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api/` }),
    tagTypes: ["Employee", "Auth"],
    endpoints: (build) => ({
        getEmployees: build.query<EmployeesResponse, void>({
            query: () => "employees",
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ _id }) => ({ type: "Employee" as const, _id })),
                        { type: "Employee", id: "LIST" },
                    ]
                    : [{ type: "Employee", id: "LIST" }],
        }),
        getEmployee: build.query({
            query: (arg) => {
                const { id } = arg;
                return `employees/${id}`;
            },
            providesTags: [{ type: "Employee", id: "LIST" }],
        }),
        addEmployee: build.mutation<EmployeeInterface, Partial<EmployeeInterface>>({
            query: (body) => ({
                url: `employees`,
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Employee', id: 'LIST' }],
        }),
        updateEmployee: build.mutation<EmployeeInterface, Partial<EmployeeInterface>>({
            query(data) {
                const { _id, ...body } = data
                return {
                    url: `employees/${_id}`,
                    method: 'PUT',
                    body,
                }
            },
            invalidatesTags: [{ type: 'Employee', id: "LIST" }],
        }),
        deleteEmployee: build.mutation({
            query(id) {
                return {
                    url: `employees/${id}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: [{ type: "Employee", id: "LIST" }],
        }),
        register: build.mutation<AuthInterface, Partial<AuthInterface>>({
            query: (body) => ({
                url: `auth/signUp`,
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Auth', id: 'LIST' }],
        }),
        login: build.mutation<AuthInterface, Partial<AuthInterface>>({
            query: ({
                email,
                password
            }) => ({
                url: `auth/signWithPassword`,
                method: 'POST',
                body: {
                    email,
                    password,
                    returnSecureToken: true
                },
            }),
            invalidatesTags: [{ type: 'Auth', id: 'LIST' }],
        }),
        token: build.mutation<TokenInterface, Partial<TokenInterface>>({
            query: () => ({
                url: `auth/token`,
                method: 'POST',
                body: {
                    grant_type: "refresh_token",
                    refresh_token: localStorageService.getRefreshToken()
                },
            }),
            invalidatesTags: [{ type: 'Auth', id: 'LIST' }],
        }),
    }),
});

export const {
    useGetEmployeesQuery,
    useGetEmployeeQuery,
    useUpdateEmployeeMutation,
    useDeleteEmployeeMutation,
    useAddEmployeeMutation,
    useRegisterMutation,
    useLoginMutation,
    useTokenMutation
} = employeesApi;
