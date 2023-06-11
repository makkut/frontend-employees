import { IUser, AuthResponse, EmployeeInterface } from "../interfaces/interfaces";
import { makeAutoObservable, runInAction } from "mobx";
import AuthService from "../services/AuthService";
import axios from 'axios';
import EmployeeService from "@/services/EmployeeService";
import { toast } from "react-toastify";

const API_URL = process.env.API_URL;

export default class Store {
    user = {} as IUser;
    employees = [] as EmployeeInterface[];
    isAuth = false;
    isLoading = false;
    isError = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    setError(bool: boolean) {
        this.isError = bool;
    }

    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e: any) {
            toast.error(e.response?.data?.message)
            console.log(e.response?.data?.message);
        }
    }

    async registration(email: string, password: string) {
        try {
            const response = await AuthService.registration(email, password);
            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e: any) {
            toast.error(e.response?.data?.message)
            console.log(e.response?.data?.message);
        }
    }

    async logout() {
        try {
            await AuthService.logout();
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            this.setAuth(false);
            this.setUser({} as IUser);
        } catch (e: any) {
            toast.error(e.response?.data?.message)
            console.log(e.response?.data?.message)
        }
    }

    async checkAuth() {
        try {
            // const response = await axios.get<AuthResponse>(`${API_URL}/api/auth/refresh`, { withCredentials: true })
            const response = await axios.post<AuthResponse>(`${API_URL}/api/auth/refresh`, { refreshToken: localStorage.getItem('refreshToken') }, { withCredentials: true })
            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e: any) {
            toast.error(e.response?.data?.message)
            console.log(e.response?.data?.message)
        } finally {
            this.setLoading(false);
        }
    }

    async getEmployees() {
        this.setLoading(true);
        try {
            const response = await EmployeeService.fetchEmployees();
            runInAction(() => {
                this.employees = response.data;
            })
        } catch (e) {
            console.log("Error");
        } finally {
            this.setLoading(false);
        }
    }

    async addEmployee(body: EmployeeInterface) {
        try {
            const response = await EmployeeService.addEmployee(body);
            this.employees.push(response.data);
        } catch (e) {
            console.log("Error");
            this.setError(true);
        }
    }

    async updateEmployee(id: string | undefined, body: EmployeeInterface) {
        try {
            await EmployeeService.updateEmployee(id, body);
            const uodatedData = this.employees.map(el => el._id === id ? { ...el, firstname: body.firstname, lastname: body.lastname, phone: body.phone, birthdate: body.birthdate, address: body.address } : el)
            this.employees = uodatedData;
        } catch (e) {
            console.log("Error");
            this.setError(true);
        }
    }

    async deleteEmployee(id: string | undefined) {
        try {
            await EmployeeService.deleteEmployee(id);
            const filteredData = this.employees.filter(item => item._id !== id);
            this.employees = filteredData;
            this.setLoading(false);
        } catch (e) {
            console.log("Error");
            this.setLoading(false);
            this.setError(true);
        }
    }
}
