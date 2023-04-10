export interface User {
    id: string;
    name: string;
    age: number;
    birthDate: string;
    isActive: boolean
}

export interface UserMap {
    [key: string]: User;
}

export interface UserPayload {
    name: string;
    age: number;
    birthDate: string;
}