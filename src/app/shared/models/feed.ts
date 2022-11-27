import { Educacion } from "./educacion";
import { Experiencia } from "./experiencia";
import { Perfil } from "./perfil";
import { Proyecto } from "./proyecto";
import { Skill } from "./skill";

export interface Feed {
    perfil: Perfil;
    experiencias: Experiencia[];
    proyectos: Proyecto[];
    habilidades: Skill[];
    educaciones: Educacion[];
}