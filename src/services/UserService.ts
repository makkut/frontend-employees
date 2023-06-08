import $api from "../http";
import { AxiosResponse } from 'axios';
import { IUser } from "../interfaces/interfaces";

export default class UserService {
    static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>('/api/users')
    }
}

