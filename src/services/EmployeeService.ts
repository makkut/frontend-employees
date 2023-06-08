import $api from "../http";
import { AxiosResponse } from 'axios';
import { EmployeeInterface } from "@/interfaces/interfaces";

export default class EmployeeService {
    static fetchEmployees(): Promise<AxiosResponse<EmployeeInterface[]>> {
        return $api.get<EmployeeInterface[]>('/api/employees')
    }

    static fetchEmployee(id: string | undefined): Promise<AxiosResponse<EmployeeInterface>> {
        return $api.get<EmployeeInterface>(`/api/employees/${id}`)
    }

    static addEmployee(body: EmployeeInterface): Promise<AxiosResponse<EmployeeInterface>> {
        return $api.post<EmployeeInterface>(`/api/employees`, body)
    }

    static updateEmployee(id: string | undefined, body: EmployeeInterface): Promise<AxiosResponse<EmployeeInterface>> {
        return $api.put<EmployeeInterface>(`/api/employees/${id}`, body)
    }

    static deleteEmployee(id: string | undefined): Promise<AxiosResponse<EmployeeInterface>> {
        return $api.delete<EmployeeInterface>(`/api/employees/${id}`)
    }
}

