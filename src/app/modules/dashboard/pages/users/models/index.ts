export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: "ADMIN" | "EMPLOYEE";
    accessToken: string;
}