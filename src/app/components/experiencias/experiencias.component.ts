import { Component, OnInit } from '@angular/core';
import { Experiencia } from 'src/app/models/experiencia';
import { ExperienciaService } from 'src/app/services/experiencia.service';

@Component({
  selector: 'app-experiencias',
  templateUrl: './experiencias.component.html',
  styleUrls: ['./experiencias.component.css']
})
export class ExperienciasComponent implements OnInit {
  experiencias: Experiencia[] = [];
  constructor(private expdata: ExperienciaService) { }

  ngOnInit(): void {
    this.cargarExperiencias();
  }

  cargarExperiencias(){
    const mySubscriber = {
      next: (res: Experiencia[]) => {
        this.experiencias = res;
        console.log(res);
      }
    };
    this.expdata.getExperiencias().subscribe(mySubscriber);
  }

}
