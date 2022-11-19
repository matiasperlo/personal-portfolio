import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { Experiencia } from '../models/experiencia';

@Injectable()
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
  constructor(
    private apiService: ApiService
  ) { }

  getExperiencias(){
    return this.apiService.get('/experiencias/all');
    // return of(this.experiencias);
  }
}
