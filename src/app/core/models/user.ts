import { Rol } from "src/app/shared/models/rol";

export interface User {
    username: string;
    jwt: string;
    rol: Rol
}