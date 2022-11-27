import { Instituto } from "./instituto";

export interface Educacion {
    id: number;
    titulo: string;
    instituto: Instituto;
    fechainicio: Date;
    fechafin: Date;
}
