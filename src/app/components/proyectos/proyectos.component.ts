import { Component, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/models/proyecto';
import { ProyectosService } from 'src/app/services/proyectos.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  proyectos: Proyecto[] = [];
  constructor(private proyectoData: ProyectosService) { }

  ngOnInit(): void {
    this.cargarProyectos();
  }

  cargarProyectos(){
    const mySubcriber = {
      next: (res: Proyecto[]) => {
        this.proyectos = res;
      }
    };

    this.proyectoData.getProyectos().subscribe(mySubcriber);
  }

}
