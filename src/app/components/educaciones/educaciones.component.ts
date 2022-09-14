import { Component, OnInit } from '@angular/core';
import { Educacion } from 'src/app/models/educacion';
import { EducacionService } from 'src/app/services/educacion.service';

@Component({
  selector: 'app-educaciones',
  templateUrl: './educaciones.component.html',
  styleUrls: ['./educaciones.component.css']
})
export class EducacionesComponent implements OnInit {
  educaciones: Educacion[] = [];
  constructor(private edudata: EducacionService) { }

  ngOnInit(): void {
    this.cargarEducaciones();
  }

  cargarEducaciones(){
    const mySubscriber = {
      next: (res: Educacion[]) => {
        this.educaciones = res;
      }
    }

    this.edudata.getEducaciones().subscribe(mySubscriber);
  }

}
