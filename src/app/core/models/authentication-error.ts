export interface AuthenticationError {
    descripcion: string;
    userAlreadyExists: boolean;
    userNotExists: boolean;
    badPassword: boolean;
}