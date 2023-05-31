export interface EmployeesInterface {
    employees: EmployeeInterface[];
}

export interface Token {
    refreshToken: string;
    accessToken: string;
    userId: string;
    expiresIn: number;
}

export interface TokenInterface {
    refreshToken: string;
}

export interface AuthInterface {
    email: string;
    password: string;
}

export interface EmployeeInterface {
    _id: string;
    firstname: string;
    lastname: string;
    birthdate: string;
    address: AddressInterface;
    phone: string;
}

export interface EmployeeInterfaceValue {
    firstname: string;
    lastname: string;
    birthdate: string;
    city: string;
    zip: string;
    street: string;
    number: string;
    phone: string;
}

export interface AddressInterface {
    city: string;
    zip: string;
    street: string;
    number: string;
}

export interface EmployeesProps {
    id?: string | undefined;
    setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
    isEdit: boolean;
    handleToast: Function;
}

export interface DeleteModalProps {
    id?: string | undefined;
    setIsDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
    isDeleteModal: boolean;
    handleToast: Function;
}
