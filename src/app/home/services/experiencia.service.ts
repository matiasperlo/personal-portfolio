import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Experiencia } from '../models/experiencia';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {
  private experiencias: Experiencia[] = [
    {
      rol: 'FrontEnd Developer',
      organizacion: 'Bigma SRL',
      jornada: 'Jornada Completa',
      fechaInicio: 'Marzo 2020',
      fechaFin: 'Actualidad'
    },
    {
      rol: 'FullStack Developer',
      organizacion: 'Camaleon APIs',
      jornada: 'Jornada Parcial',
      fechaInicio: 'Enero 2019',
      fechaFin: 'Noviembre 2019'
    }
  ];
  constructor() { }

  getExperiencias(){
    return of(this.experiencias);
  }
}
