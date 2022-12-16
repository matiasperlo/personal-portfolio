import { Empresa } from "./empresa";
import { Jornada } from "./jornada";
import { Puesto } from "./puesto";

export interface Experiencia {
    id: number;
    puesto: Puesto;
    empresa: Empresa;
    jornada: Jornada;
    fechainicio: Date;
    fechafin: Date;
}
