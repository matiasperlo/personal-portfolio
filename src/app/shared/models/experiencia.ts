import { Empresa } from "./empresa";
import { Jornada } from "./jornada";
import { Rol } from "./rol";

export interface Experiencia {
    id: number;
    rol: Rol;
    empresa: Empresa;
    jornada: Jornada;
    fechainicio: Date;
    fechafin: Date;
}
