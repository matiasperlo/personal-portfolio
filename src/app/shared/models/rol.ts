export interface Rol {
    id: number;
    rol: string;
    descripcion: string;
}

export function isRol(data: any): boolean {
    return data instanceof Object && "rol" in data && "descripcion" in data
}