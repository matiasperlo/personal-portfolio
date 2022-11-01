import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Educacion } from '../models/educacion';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {
  private educaciones: Educacion[] = [
    {
      titulo: 'Ingenieria de Software',
      academia: 'Universidad Siglo21',
      fechaInicio: 'Enero 2019',
      fechaFin: 'Noviembre 2019'
    },
    {
      titulo: 'Desarrollo de Aplicaciones Mobile',
      academia: 'Academia de Google',
      fechaInicio: 'Enero 2019',
      fechaFin: 'Noviembre 2019'
    }
  ]
  constructor() { }

  getEducaciones(){
    return of(this.educaciones);
  }
}
