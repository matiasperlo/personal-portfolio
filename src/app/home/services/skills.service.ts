import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Skill } from '../models/skill';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  private skills: Skill[] = [
    {
      nombre: 'Resolucion de Problemas',
      progreso: 75
    },
    {
      nombre: 'Diseño de Sistemas',
      progreso: 90
    },
    {
      nombre: 'Programacion Orientada a Objetos',
      progreso: 75
    }
  ]
  constructor() { }

  getSkills(){
    return of(this.skills);
  }
}
