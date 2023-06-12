import { AuthResponse, EmployeeInterface, IUser } from '@/interfaces/interfaces'
import AuthService from '@/services/AuthService';
import EmployeeService from '@/services/EmployeeService';
import axios from 'axios';
import { toast } from 'react-toastify';
import { create } from 'zustand'

const API_URL = process.env.API_URL;

export const useUser = create((set) => ({
    user: {} as IUser,
    isAuth: false,
    isLoading: false,
    isError: false,

    login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            set({ isAuth: true });
            set({ user: response.data.user });
        } catch (e: any) {
            toast.error(e.response?.data?.message)
            console.log(e.response?.data?.message);
        } finally {
            set({ isLoading: false });
        }
    },

    registration: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
            const response = await AuthService.registration(email, password);
            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            set({ isAuth: true });
            set({ user: response.data.user });
        } catch (e: any) {
            toast.error(e.response?.data?.message)
            console.log(e.response?.data?.message);
        } finally {
            set({ isLoading: false });
        }
    },

    logout: async () => {
        set({ isLoading: true });
        try {
            await AuthService.logout();
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            set({ isAuth: false });
            set({ user: {} as IUser });
        } catch (e: any) {
            toast.error(e.response?.data?.message)
            console.log(e.response?.data?.message)
        } finally {
            set({ isLoading: false });
        }
    },

    checkAuth: async () => {
        set({ isLoading: true });
        try {
            // const response = await axios.get<AuthResponse>(`${API_URL}/api/auth/refresh`, { withCredentials: true })
            const response = await axios.post<AuthResponse>(`${API_URL}/api/auth/refresh`, { refreshToken: localStorage.getItem('refreshToken') }, { withCredentials: true })
            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            set({ isAuth: true });
            set({ user: response.data.user });
        } catch (e: any) {
            toast.error(e.response?.data?.message)
            console.log(e.response?.data?.message)
        } finally {
            set({ isLoading: false });
        }
    }

}))

export const useEmployees = create((set, get: any) => ({
    employees: [] as EmployeeInterface[],
    employee: {} as EmployeeInterface,
    isLoading: false,
    isError: false,

    getEmployees: async () => {
        set({ isLoading: true });
        try {
            const response = await EmployeeService.fetchEmployees();
            set({ employees: response.data })
        } catch (e) {
            console.log("Error");
        } finally {
            set({ isLoading: false });
        }
    },

    getEmployee: async (id: string | undefined) => {
        set({ isLoading: true });
        try {
            const response = await EmployeeService.fetchEmployee(id);
            set({ employee: response.data })
            console.log("employee", get().employee)
        } catch (e) {
            console.log("Error");
        } finally {
            set({ isLoading: false });
        }
    },

    addEmployee: async (body: EmployeeInterface) => {
        set({ isLoading: true });
        try {
            const response = await EmployeeService.addEmployee(body);
            set({ employees: [...get().employees, response.data] });
        } catch (e) {
            console.log("Error");
            set({ isError: true });
        } finally {
            set({ isLoading: false });
        }

    },

    updateEmployee: async (id: string | undefined, body: EmployeeInterface) => {
        set({ isLoading: true });
        try {
            await EmployeeService.updateEmployee(id, body);
            set({ employees: get().employees.map((el: { _id: string | undefined; }) => el._id === id ? { ...el, firstname: body.firstname, lastname: body.lastname, phone: body.phone, birthdate: body.birthdate, address: body.address } : el) })
        } catch (e) {
            console.log("Error");
            set({ isError: true });
        } finally {
            set({ isLoading: false });
        }
    },

    deleteEmployee: async (id: string | undefined) => {
        set({ isLoading: true });
        try {
            await EmployeeService.deleteEmployee(id);
            set({ employees: get().employees.filter((item: { _id: string | undefined; }) => item._id !== id) });
        } catch (e) {
            console.log("Error");
            set({ isError: true });
        } finally {
            set({ isLoading: false });
        }
    }

}))
