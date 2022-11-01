import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Proyecto } from '../models/proyecto';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {
  private proyectos: Proyecto[] = [
    {
      nombre: 'e-commerce',
      link: '#',
      descripcion: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel soluta explicabo ab ipsa pariatur illo delectus iure aperiam voluptatum eligendi quam nihil asperiores molestiae dolorem, unde blanditiis laudantium, excepturi perspiciatis!'
    },
    {
      nombre: 'red social',
      link: '#',
      descripcion: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel soluta explicabo ab ipsa pariatur illo delectus iure aperiam voluptatum eligendi quam nihil asperiores molestiae dolorem, unde blanditiis laudantium, excepturi perspiciatis!'
    },
    {
      nombre: 'simulador',
      link: '#',
      descripcion: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel soluta explicabo ab ipsa pariatur illo delectus iure aperiam voluptatum eligendi quam nihil asperiores molestiae dolorem, unde blanditiis laudantium, excepturi perspiciatis!'
    }
  ];

  constructor() { }

  getProyectos(){
    return of(this.proyectos);
  }
}
